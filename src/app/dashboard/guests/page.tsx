import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import { getConnectedUser } from '~/app/shared/services/users'
import {
  getAllGuestsServerAction,
  deleteGuestServerAction
} from '~/app/shared/actions/dashboard/guest'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await getConnectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: guests }
  } = await getAllGuestsServerAction()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={guests}
        connectedUser={connectedUser}
        refetch={getAllGuestsServerAction}
        deleteServerAction={deleteGuestServerAction}
      />
    </div>
  )
}

export default GuestsPage
