import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/core/actions/user'
import CreateGuestForm from '~/app/control/components/Guests/Form'

const GuestsCreatePage: NextPage = async () => {
  const cookieStore = await cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm
        action="save"
        data={{ businessSlug: connectedUser.businessSlug, businessId: connectedUser.businessId }}
      />
    </div>
  )
}

export default GuestsCreatePage
