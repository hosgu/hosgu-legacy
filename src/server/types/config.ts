export type Mode = 'production' | 'development'

export enum DeploymentType {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development'
}

export interface Configuration {
  mode?: Mode
  api?: {
    baseUrl?: string
    version?: string
  }
  domainName: string
  database?: {
    debug: boolean
    engine: string
    port: number
    host: string
    database: string
    username: string
    password: string
  }
  jwt?: {
    secretKey?: string
    expiresIn?: string
  }
  user: {
    roles: string[]
  }
}
