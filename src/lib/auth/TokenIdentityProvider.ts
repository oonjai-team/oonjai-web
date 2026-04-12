import { IdentityProvider } from "@lib/service/IdentityProvider"

/**
 * Cookie-based identity provider.
 * Auth is handled via httpOnly cookies sent with credentials: "include",
 * so no Bearer token is needed. Returns empty token with no error
 * to let ServiceConnector proceed — the cookie does the auth.
 */
export class TokenIdentityProvider extends IdentityProvider {
  public async mintToken(): Promise<[string, Error | null]> {
    return ["", null]
  }
}
