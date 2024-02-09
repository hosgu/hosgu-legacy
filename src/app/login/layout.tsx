import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'

import Header from '~/app/shared/components/Header'
import getI18nFromServer from '~/app/shared/contexts/server/I18nContext'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const locale = cookieStore.get('language')?.value || 'en-us'
  const t = getI18nFromServer(locale)

  return (
    <main>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header />
      </div>

      <div>{children}</div>
    </main>
  )
}

export default Layout
