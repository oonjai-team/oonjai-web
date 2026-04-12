import { ServiceConnector } from "@lib/service/ServiceConnector"
import { TokenIdentityProvider } from "@lib/auth/TokenIdentityProvider"

let connectorInstance: ServiceConnector | null = null

export function getConnector(): ServiceConnector {
  if (!connectorInstance) {
    connectorInstance = new ServiceConnector(new TokenIdentityProvider())
  }
  return connectorInstance
}
