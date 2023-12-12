import { FC } from 'react'

import { getI18n, Locale } from '~/app/i18n'

import SignUpForm from './components/Form'

type Props = {
  params: {
    locale: Locale
  }
}

const Page: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 w-96 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">{t.signUp}</h1>

        <SignUpForm t={t} />
      </div>
    </div>
  )
}

export default Page
