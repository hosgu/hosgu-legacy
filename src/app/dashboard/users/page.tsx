import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import * as UserActions from '~/app/core/actions/user'

const UsersPage: NextPage = async () => {
  const cookieStore = await cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  const { checksum, items: users } = await UserActions.getAll()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={{ checksum, data: users }}
        connectedUser={connectedUser}
        refetch={UserActions.getAll}
        deleteServerAction={UserActions.del}
      />
    </div>
  )
}

export default UsersPage
