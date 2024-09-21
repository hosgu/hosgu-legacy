import { NextPage } from 'next'
import { cookies } from 'next/headers'

import config from '~/app/config'
import Registration from '~/app/shared/components/Registration'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || config.i18n.defaultLocale

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black">
      <div className="text-center">
        <h1 className="text-3xl font-medium text-gray-800 dark:text-white">Registration</h1>
        <Registration fromRegisterPage locale={locale} />
      </div>
    </div>
  )
}

export default Page
