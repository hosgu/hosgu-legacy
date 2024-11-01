import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/core/actions/user'

import config from '~/app/config'
import ProfileSetupForm from './components/Form'
import NotFound from '~/app/shared/components/NotFound'

type SearchParams = Promise<{ [key: string]: any }>

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { code } = await searchParams
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || config.i18n.defaultLocale
  const loggedFromProfileSetup =
    cookieStore.get('loggedFromProfileSetup')?.value === 'true' || false

  const user = await UserActions.getUserByCode(code)

  if (!user || (user.active && !loggedFromProfileSetup)) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 w-full">
      <div className="p-6 dark:text-white w-full">
        <ProfileSetupForm locale={locale} user={user} />
      </div>
    </div>
  )
}

export default Page
