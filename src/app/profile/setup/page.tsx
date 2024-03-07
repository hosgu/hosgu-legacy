import { NextPage } from 'next'
import { redirect } from 'next/navigation'

import UserService from '~/app/shared/services/user'

import i18n from '~/app/shared/contexts/server/I18nContext'
import ProfileSetupForm from './components/Form'

type Props = {
  params: {
    code: string
  }
  searchParams: {
    code: string
  }
}

const Page: NextPage<Props> = async ({ searchParams: { code } }) => {
  const t = i18n('en-us')
  const user = await UserService.getOne({
    endpoint: `user/code/${code}`,
    credentials: 'include'
  })

  if (!user) {
    redirect('/404')
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">{t('signUp')}</h1>

        <ProfileSetupForm locale="en-us" user={user} />
      </div>
    </div>
  )
}

export default Page
