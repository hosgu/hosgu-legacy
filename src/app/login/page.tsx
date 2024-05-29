import { NextPage } from 'next'
import { cookies } from 'next/headers'

import i18n from '~/app/shared/contexts/server/I18nContext'
import LoginForm from './components/Form'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const locale = cookieStore.get('language')?.value || 'en-us'
  const t = i18n(locale)

  return (
    <div className="min-h-screen flex justify-center">
      <LoginForm locale={locale} />
    </div>
  )
}

export default Page
