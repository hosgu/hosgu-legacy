import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import UserService from '~/app/shared/services/user'
import { getAllGuests, deleteGuest } from '~/app/shared/actions/dashboard/guest'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at: cookieStore.get('at')?.value || ''
    }
  })
  const {
    data: { items: guests }
  } = await getAllGuests()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={guests}
        connectedUser={connectedUser}
        refetch={getAllGuests}
        deleteServerAction={deleteGuest}
      />
    </div>
  )
}

export default GuestsPage
