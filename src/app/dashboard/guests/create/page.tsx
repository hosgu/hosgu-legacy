import { NextPage } from 'next'
import { cookies } from 'next/headers'

import UserService from '~/app/shared/services/user'
import CreateGuestForm from '~/app/dashboard/components/Guests/Form'

const GuestsCreatePage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at: cookieStore.get('at')?.value || ''
    },
    returnFirstItemOnly: true
  })

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm action="save" data={{ businessId: connectedUser.businessId }} />
    </div>
  )
}

export default GuestsCreatePage
