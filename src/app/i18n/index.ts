import { Locale as TLocale } from '@architecturex/utils.i18n'

import enUs from './translations/en-us'
import esMx from './translations/es-mx'

export const defaultLocale = 'en-us'
export const allowedLocales = ['en-us', 'es-mx']

type EnUsTranslations = typeof enUs
type EsMxTranslations = typeof esMx

export type Locale = TLocale

export type Translations = EnUsTranslations | EsMxTranslations

export const getI18n = async (locale: TLocale) => {
  if (locale === 'es-mx') {
    return esMx
  }

  return enUs
}
