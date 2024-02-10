import { FC } from 'react'

import { getUserByCode } from '~/app/shared/services/users'
import { redirect } from 'next/navigation'

import ProfileSetupForm from './components/Form'

type Props = {
  params: {
    code: string
  }
  searchParams: {
    code: string
  }
}

const Page: FC<Props> = async ({ searchParams: { code } }) => {
  const user = await getUserByCode(code)

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
