import '~app/globals.css'
import { FC, ReactElement } from 'react'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '~contexts/ThemeContext'
import NotFound from '~components/NotFound'
import { allowedLocales } from '~/app/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1stGuest.com'
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

const RootLayout: FC<Props> = ({ children, params: { locale = 'en-us' } }) => {
  const cookieStore = cookies()
  const darkMode = cookieStore.get('darkMode')
  const theme = darkMode?.value === 'true' ? 'dark' : ''

  if (!allowedLocales.includes(locale)) {
    return <NotFound />
  }

  return (
    <html lang={locale} className={theme}>
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultDarkMode={theme === 'dark'}>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
