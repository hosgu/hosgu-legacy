import { FC } from 'react'

import { getI18n, Locale } from '~/app/i18n'

type Props = {
  params: {
    locale: Locale
  }
}

const DashboardPage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="p-2 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Dashboard</h1>
      </div>
    </div>
  )
}

export default DashboardPage
