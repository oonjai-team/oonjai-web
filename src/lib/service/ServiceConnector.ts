import type { IdentityProvider } from "@lib/service/IdentityProvider"
import { APIResponse, ResponseType } from "./APIResponse"
import { VersionNumber } from "@lib/service/VersionParser"
import { env } from "@lib/env"

/**
 * Expected envelope from the backend:
 * { status: 0=SUCCESS | 1=FAILED | 2=ERROR, message: string, payload: T | null }
 */
interface APIEnvelope<T = unknown> {
  status: number
  message: string
  payload: T | null
}

function isEnvelope(data: unknown): data is APIEnvelope {
  return (
    typeof data === "object" &&
    data !== null &&
    "status" in data &&
    "message" in data &&
    "payload" in data
  )
}

/** Map the backend envelope into a typed APIResponse. */
function fromEnvelope<T>(envelope: APIEnvelope<T>): APIResponse<T> {
  const response = new APIResponse<T>()

  switch (envelope.status) {
    case 0: // SUCCESS
      response.setType(ResponseType.SUCCESS)
      break
    case 1: // FAILED
      response.setType(ResponseType.FAILED)
      break
    case 2: // ERROR
      response.setType(ResponseType.ERROR)
      break
    default:
      response.setType(ResponseType.DISMISSED)
  }

  if (envelope.message) {
    response.setMessage(envelope.message)
  }
  if (envelope.payload !== null && envelope.payload !== undefined) {
    response.setPayload(envelope.payload)
  }

  return response
}

/**
 * ServiceConnector is responsible for interacting with a remote service API.
 * It handles building API paths, authenticating requests, validating service versions,
 * and processing responses for GET, POST, PUT and DELETE HTTP methods.
 *
 * Auth is primarily handled via httpOnly cookies (credentials: "include").
 * A Bearer token is included only if the IdentityProvider returns one.
 *
 * The backend wraps all JSON responses in an APIResponse envelope:
 *   { status: 0|1|2, message: string, payload: T | null }
 */
export class ServiceConnector {
  public identityProvider: IdentityProvider
  public version: string
  public allowedVersion: VersionNumber

  constructor(idenProvider: IdentityProvider, version?: string) {
    this.version = version ?? "v1"
    this.identityProvider = idenProvider

    this.allowedVersion = new VersionNumber(
      process.env.NEXT_PUBLIC_ALLOWED_SERVICE_VERSION!,
    )
  }

  private buildPath(endpoint: string): string {
    return endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }

  private validateServiceVersion(response: Response): boolean | null {
    const version = response.headers.get("X-Service-Version")

    if (!version) {
      if (response.type === "cors") {
        return true
      }
      return null
    }

    return this.allowedVersion.compareTo(version)
  }

  /** Build auth headers — only include Authorization if a token is available. */
  private async buildAuthHeaders(): Promise<[Record<string, string>, Error | null]> {
    const [token, err] = await this.identityProvider.mintToken()
    if (err) return [{}, err]
    const headers: Record<string, string> = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return [headers, null]
  }

  /** Parse JSON response body into APIResponse, handling the envelope format. */
  private parseResponse<T>(json: unknown): APIResponse<T> {
    if (isEnvelope(json)) {
      return fromEnvelope<T>(json as APIEnvelope<T>)
    }
    // Fallback for non-envelope responses (e.g. 204 or unexpected format)
    const response = new APIResponse<T>()
    if (json !== null && json !== undefined) {
      response.setPayload(json as T)
    }
    return response.success()
  }

  public async GET<T>(
    endpoint: string,
    params?: Record<string, string>,
    headers: HeadersInit = {},
    byPass = false,
  ) {
    const response = new APIResponse<T>()
    const [authHeaders, err] = await this.buildAuthHeaders()

    if (err) {
      return response.error(err.message)
    }

    const url = new URL(this.buildPath(endpoint), env.SERVICE_URL)

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v)
      }
    }

    try {
      const f = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
          ...headers,
        },
      })

      if (!this.validateServiceVersion(f) && !byPass) {
        return response.error(
          `invalid service version: ${f.headers.get("X-Service-Version")} is not compatible with ${this.allowedVersion.vtext}`,
        )
      }

      try {
        if (f.body) {
          const json = await f.json()
          return this.parseResponse<T>(json)
        }
        if (f.status === 200 || f.status === 204) {
          return response.success()
        }
      } catch {
        if (f.status === 200 || f.status === 204) {
          return response.success()
        }
        return response.error("unable to parse json response")
      }

      return response.failed()
    } catch {
      return response.error("unable to fetch response")
    }
  }

  public async POST<T>(
    endpoint: string,
    data?: Record<string, unknown> | Blob,
    headers: HeadersInit = {},
  ) {
    const response = new APIResponse<T>()
    const [authHeaders, err] = await this.buildAuthHeaders()

    if (err) {
      return response.error(err.message)
    }

    const url = new URL(this.buildPath(endpoint), env.SERVICE_URL)

    try {
      let body: string | FormData = JSON.stringify(data)
      let header: string | undefined = "application/json"

      if (data instanceof Blob) {
        body = new FormData()
        body.append("file", data)
        header = undefined
      }

      const f = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          ...authHeaders,
          Accept: "application/json",
          ...(header && { "Content-Type": header }),
          ...headers,
        },
        body: body,
      })

      if (!this.validateServiceVersion(f)) {
        return response.error(
          `invalid service version: ${f.headers.get("X-Service-Version")} is not compatible with ${this.allowedVersion.vtext}`,
        )
      }

      try {
        if (f.body) {
          const json = await f.json()
          return this.parseResponse<T>(json)
        }
        if (f.status >= 200 && f.status < 300) {
          return response.success()
        }
      } catch {
        if (f.status >= 200 && f.status < 300) {
          return response.success()
        }
        return response.error("unable to parse json response")
      }

      return response.failed()
    } catch {
      return response.error("unable to fetch response")
    }
  }

  public async PUT<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    headers: HeadersInit = {},
  ) {
    const response = new APIResponse<T>()
    const [authHeaders, err] = await this.buildAuthHeaders()

    if (err) {
      return response.error(err.message)
    }

    const url = new URL(this.buildPath(endpoint), env.SERVICE_URL)

    try {
      const f = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        body: JSON.stringify(data),
      })

      if (!this.validateServiceVersion(f)) {
        return response.error(
          `invalid service version: ${f.headers.get("X-Service-Version")} is not compatible with ${this.allowedVersion.vtext}`,
        )
      }

      try {
        if (f.body) {
          const json = await f.json()
          return this.parseResponse<T>(json)
        }
        if (f.status === 200) {
          return response.success()
        }
      } catch {
        if (f.status === 200) {
          return response.success()
        }
        return response.error("unable to parse json response")
      }

      return response.failed()
    } catch {
      return response.error("unable to fetch response")
    }
  }

  public async DELETE<T>(
    endpoint: string,
    headers: HeadersInit = {},
  ) {
    const response = new APIResponse<T>()
    const [authHeaders, err] = await this.buildAuthHeaders()

    if (err) {
      return response.error(err.message)
    }

    const url = new URL(this.buildPath(endpoint), env.SERVICE_URL)

    try {
      const f = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
          ...headers,
        },
      })

      if (!this.validateServiceVersion(f)) {
        return response.error(
          `invalid service version: ${f.headers.get("X-Service-Version")} is not compatible with ${this.allowedVersion.vtext}`,
        )
      }

      try {
        if (f.status === 204) {
          return response.success()
        }
        if (f.body) {
          const json = await f.json()
          return this.parseResponse<T>(json)
        }
        if (f.status === 200) {
          return response.success()
        }
      } catch {
        if (f.status === 200 || f.status === 204) {
          return response.success()
        }
        return response.error("unable to parse json response")
      }

      return response.failed()
    } catch {
      return response.error("unable to fetch response")
    }
  }
}
