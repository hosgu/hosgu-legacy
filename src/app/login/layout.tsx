import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'

import Header from '~/app/shared/components/Header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const locale = cookieStore.get('language')?.value || 'en-us'

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
