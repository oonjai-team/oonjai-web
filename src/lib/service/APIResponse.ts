export enum ResponseType {
  SUCCESS = 0,
  FAILED = 1,
  ERROR = 2,
  DISMISSED = 3,
}

export const GetPayloadError = new Error(
  "Payload is invalid. Maybe the response is not successful.",
)

export class APIResponse<T> {
  public type: ResponseType
  public payload: T | undefined
  public message: string

  constructor(type?: ResponseType, message?: string) {
    this.type = type ?? ResponseType.DISMISSED
    this.message = message ?? ""
  }

  public error(m?: string): APIResponse<T> {
    this.setType(ResponseType.ERROR)
    console.error(`APIResponse [Error]: ${m}`)
    if (m) this.setMessage(m)
    return this
  }

  public failed(m?: string): APIResponse<T> {
    this.setType(ResponseType.FAILED)
    console.error(`APIResponse [Failed]: ${m}`)
    if (m) this.setMessage(m)
    return this
  }

  public success(m?: string, payload?: T): APIResponse<T> {
    this.setType(ResponseType.SUCCESS)
    if (m) this.setMessage(m)
    if (payload) this.setPayload(payload)
    return this
  }

  public set(t: ResponseType, m?: string): APIResponse<T> {
    this.setType(t)
    if (m) this.setMessage(m)
    return this
  }

  public setType(t: ResponseType): APIResponse<T> {
    this.type = t
    return this
  }

  public setMessage(m: string): APIResponse<T> {
    this.message = m
    return this
  }

  public setPayload(p: T): APIResponse<T> {
    this.payload = p
    return this
  }

  public getPayload(): T {
    if (this.type === ResponseType.SUCCESS) {
      return this.payload as T
    }

    throw GetPayloadError
  }

  public debug() {
    console.debug(`Type ${ResponseType[this.type]} \nMessage: ${this.message}`)
    console.debug(this.payload)
  }

  public isSuccess(): boolean {
    return this.type === ResponseType.SUCCESS
  }

  public simplify(): {
    status: number
    message: string
    payload: unknown
  } {
    return {
      status: this.type,
      message: this.message,
      payload: this.payload,
    }
  }
}
