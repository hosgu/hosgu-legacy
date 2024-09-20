import enUs from './translations/en-us'
import esMx from './translations/es-mx'

export const defaultLocale = 'en-us'
export const allowedLocales = ['en-us', 'es-mx']

type EnUsTranslations = typeof enUs
type EsMxTranslations = typeof esMx

export type Locale = 'de-de' | 'en-us' | 'es-mx' | 'fr-fr' | 'it-it' | 'pt-br' | string

export type Translations = keyof EnUsTranslations | EsMxTranslations

const i18n = (currentLocale: Locale = defaultLocale) => {
  const getI18n = () => {
    if (currentLocale === 'es-mx') {
      return esMx
    }

    return enUs
  }

  const translations = getI18n()

  return {
    t: (key: Translations, replacements?: any) => {
      // @ts-ignore
      const translation = translations[key]
      let text = translation || (key as Translations)

      const matches = text.match(/\{(.*?)\}/g)

      if (matches) {
        matches.forEach((match: string) => {
          const tag = match.replace(/[{}]/g, '')
          const replacement = replacements[tag]

          if (replacement) {
            // @ts-ignore
            text = text.replace(`{${tag}}`, replacement) as Translations
          }
        })
      }

      return text
    }
  }
}

export const getServerContext = (locale: Locale = defaultLocale) => {
  return i18n(locale).t
}

export default getServerContext
