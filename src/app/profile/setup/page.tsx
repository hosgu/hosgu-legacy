import { NextPage } from 'next'

import * as UserActions from '~/app/shared/actions/user'

import i18n from '~/app/shared/contexts/server/I18nContext'
import ProfileSetupForm from './components/Form'
import NotFound from '~/app/shared/components/NotFound'

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

  const user = await UserActions.getUserByCode(code)

  if (!user) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 w-full">
      <div className="p-6 dark:text-white w-full">
        <ProfileSetupForm locale="en-us" user={user} />
      </div>
    </div>
  )
}

export default Page
