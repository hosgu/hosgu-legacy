import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/shared/actions/user'
import CreateGuestForm from '~/app/dashboard/components/Guests/Form'

const GuestsCreatePage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm action="save" data={{ businessId: connectedUser.businessId }} />
    </div>
  )
}

export default GuestsCreatePage
