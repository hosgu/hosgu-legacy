import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import UserService from '~/app/shared/services/user'
import { getAllUsers, deleteUser } from '~/app/shared/actions/dashboard/user'

const UsersPage: NextPage = async () => {
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
  } = await getAllUsers()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={guests}
        connectedUser={connectedUser}
        refetch={getAllUsers}
        deleteServerAction={deleteUser}
      />
    </div>
  )
}

export default UsersPage
