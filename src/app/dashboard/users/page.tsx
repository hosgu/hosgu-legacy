import { NextPage } from 'next'
import { cookies } from 'next/headers'

import { getConnectedUser } from '~/app/shared/services/users'
import { getAllGuestsServerAction } from '~/app/shared/actions/dashboard/guest'
import UsersTable from './UsersTable'

const UsersPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await getConnectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: guests }
  } = await getAllGuestsServerAction()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <UsersTable data={guests} connectedUser={connectedUser} refetch={getAllGuestsServerAction} />
    </div>
  )
}

export default UsersPage
