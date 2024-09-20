import '~/app/shared/globals.css'

import { FC, ReactElement } from 'react'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import cx from '@architecturex/utils.cx'

import { ThemeProvider } from '~/app/core/contexts/client/ThemeContext'
import { allowedLocales } from '~/app/core/contexts/server/I18nContext'

import config from '~/config'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: config.siteTitle
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false
}

type Props = {
  params: {
    locale: 'en-us' | 'es-mx'
  }
  children: ReactElement | ReactElement[]
}

const RootLayout: FC<Props> = ({ children }) => {
  const cookieStore = cookies()
  const darkMode = cookieStore.get('darkMode')
  const theme = darkMode?.value === 'true' ? 'dark' : 'theme'
  let locale = cookieStore.get('locale')?.value || 'en-us'

  if (!allowedLocales.includes(locale)) {
    locale = 'en-us'
  }

  return (
    <html lang={locale} className={theme}>
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={cx.join(inter.className)}>
        <ThemeProvider defaultDarkMode={theme === 'dark'}>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
