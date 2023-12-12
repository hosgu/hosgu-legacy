import { Configuration } from './types/config'

const isProduction = process.env.NODE_ENV === 'production'
const isLocal = process.env.LOCAL === 'true'
const isLocalProduction = isProduction && isLocal

export const globalConfig: Configuration = {
  siteTitle: '1st Guest',
  domainName: '1stguest.com',
  theme: {
    defaultTheme: 'dark'
  },
  api: {
    uri: ''
  },
  i18n: {
    locales: ['en-us', 'es-mx'],
    languages: ['English', 'Spanish'],
    defaultLocale: 'en-us'
  },
  redirections: {
    localeRedirections: {
      en: 'en-us',
      es: 'es-mx'
    }
  }
}

const buildConfig = (): Configuration => {
  const config: Configuration = {
    ...globalConfig,
    api: {
      uri:
        isProduction && !isLocalProduction
          ? `https://${globalConfig.domainName}/graphql`
          : 'http://localhost:4000/graphql'
    },
    homeUrl: `https://${globalConfig.domainName}`,
    hostname: isProduction && !isLocalProduction ? globalConfig.domainName : 'localhost',
    mode: isProduction ? 'production' : 'development'
  }

  return config
}

const Config = buildConfig()

export default Config
