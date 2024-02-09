import { NextPage } from 'next'
import { cookies } from 'next/headers'

import LoginForm from './components/Form'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const locale = cookieStore.get('language')?.value || 'en-us'

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">{t('login')}</h1>

        <LoginForm />
      </div>
    </div>
  )
}

export default Page
