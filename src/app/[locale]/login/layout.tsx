import { FC, ReactElement } from 'react'

import { getI18n, Locale } from '~/app/i18n'
import Header from '~components/Header'

type Props = {
  params: {
    locale: Locale
  }
  children: ReactElement
}

const Layout: FC<Props> = async ({ params, children }) => {
  const t = await getI18n(params.locale)

  return (
    <main>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header t={t} locale={params.locale} />
      </div>

      <div>{children}</div>
    </main>
  )
}

export default Layout
