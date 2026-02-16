import type { IdentityProvider } from "@lib/service/IdentityProvider"
import { APIResponse } from "./APIResponse"
import * as Path from "path"
import { VersionNumber } from "@lib/service/VersionParser"
import { env } from "@lib/env"

/**
 * ServiceConnector is responsible for interacting with a remote service API.
 * It handles building API paths, authenticating requests, validating service versions,
 * and processing responses for GET and POST HTTP methods.
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
    return Path.join("api", this.version, endpoint)
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

  /**
   * Sends an HTTP GET request to the specified endpoint, optionally including query parameters and headers.
   * Handles authentication, validates response compatibility with the allowed service version, and parses the response.
   *
   * @param endpoint The endpoint to which the GET request will be sent.
   * @param params Optional query parameters to include in the request.
   * @param headers Optional headers to include in the request. Defaults to an empty object.
   * @param byPass Flag to bypass service version validation. Defaults to false.
   * @return A promise resolving to an instance of `APIResponse` containing the response payload or error details.
   */
  public async GET<T>(
    endpoint: string,
    params?: Record<string, string>,
    headers: HeadersInit = {},
    byPass = false,
  ) {
    const response = new APIResponse<T>()
    const [token, err] = await this.identityProvider.mintToken()

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
        headers: {
          Authorization: `Bearer ${token}`,
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
          const result = await f.json()

          response.setPayload(result as T)

          return response.success()
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

  /**
   * Sends a POST request to the specified endpoint with the provided data and headers.
   *
   * @param {string} endpoint - The API endpoint to which the POST request should be made.
   * @param {Record<string, unknown> | Blob} [data] - The data to be sent in the body of the POST request. Can be a JSON object or a Blob.
   * @param {HeadersInit} [headers={}] - Additional headers to be included in the request.
   * @return {Promise<APIResponse<T>>} A promise that resolves to an APIResponse object containing the response data or error information.
   */
  public async POST<T>(
    endpoint: string,
    data?: Record<string, unknown> | Blob,
    headers: HeadersInit = {},
  ) {
    const response = new APIResponse<T>()
    const [token, err] = await this.identityProvider.mintToken()

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
        headers: {
          Authorization: `Bearer ${token}`,
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

      if (f.status === 200) {
        try {
          const result = await f.json()

          response.setPayload(result as T)

          return response.success()
        } catch {
          return response.success()
        }
      } else {
        if (f.status === 202) {
          const message = await f.text()
          if (message) {
            response.setMessage(message)
          }
        }
      }

      return response.failed()
    } catch {
      return response.error("unable to fetch response")
    }
  }
}
