import { NextPage } from 'next'
import { redirect } from 'next/navigation'

import { getUserByCode } from '~/app/shared/services/users'

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
  const user = await getUserByCode(code)

  if (!user) {
    redirect('/404')
  }

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 w-full">
      <div
        className="p-6 dark:text-white w-full"
        style={{ height: '700px', border: '1px solid red' }}
      >
        <ProfileSetupForm locale="en-us" user={user} />
      </div>
    </div>
  )
}

export default Page
