import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'

import config from '~/config'
import Header from '~/app/shared/components/Header'

type Props = {
  children: ReactElement
}

export const metadata: Metadata = {
  title: `${config.siteTitle} - Login`
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || config.i18n.defaultLocale

  return (
    <main>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header locale={locale} />
      </div>

      <div>{children}</div>
    </main>
  )
}

export default Layout
