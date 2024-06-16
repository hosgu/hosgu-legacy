import { NextPage } from 'next'
import { cookies } from 'next/headers'

import config from '~/app/config'
import LoginForm from './components/Form'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || config.i18n.defaultLocale

  return (
    <div className="min-h-screen flex justify-center">
      <LoginForm locale={locale} />
    </div>
  )
}

export default Page
