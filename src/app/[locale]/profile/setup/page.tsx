import { FC } from 'react'

import { getI18n, Locale } from '~/app/i18n'
import services from '~/app/services'
import { redirect } from 'next/navigation'

import ProfileSetupForm from './components/Form'

type Props = {
  params: {
    locale: Locale
    code: string
  }
  searchParams: {
    code: string
  }
}

const Page: FC<Props> = async ({ params: { locale = 'en-us' }, searchParams: { code } }) => {
  const t = await getI18n(locale)
  const user = await services.users.getUserByCode(code)

  if (!user) {
    redirect('/404')
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">{t.signUp}</h1>

        <ProfileSetupForm t={t} user={user} />
      </div>
    </div>
  )
}

export default Page
