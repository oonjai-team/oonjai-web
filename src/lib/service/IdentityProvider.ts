export class IdentityProvider {
  protected cachedToken: string | undefined;

  public async mintToken(): Promise<[string, Error | null]> {
    return ["", new Error("No implementation found")];
  }
}
