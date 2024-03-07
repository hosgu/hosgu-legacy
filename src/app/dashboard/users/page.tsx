import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import * as UserActions from '~/app/shared/actions/user'

const UsersPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  const {
    data: { items: guests }
  } = await UserActions.getAll()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={guests}
        connectedUser={connectedUser}
        refetch={UserActions.getAll}
        deleteServerAction={UserActions.del}
      />
    </div>
  )
}

export default UsersPage
