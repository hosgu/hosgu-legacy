import { NextPage } from 'next'
import { cookies } from 'next/headers'

import GuestTable from './Results'
import { getConnectedUser } from '~/app/shared/services/users'
import { getAllUsersServerAction } from '~/app/shared/actions/dashboard/user'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await getConnectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: guests }
  } = await getAllUsersServerAction()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <GuestTable
        data={guests}
        connectedUser={connectedUser}
        refetch={getAllUsersServerAction}
        deleteServerAction={() => null}
      />
    </div>
  )
}

export default GuestsPage
