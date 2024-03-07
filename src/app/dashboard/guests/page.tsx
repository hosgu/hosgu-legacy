import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Results from './Results'
import * as UserActions from '~/app/shared/actions/user'
import * as GuestActions from '~/app/shared/actions/guest'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  const {
    data: { items: guests }
  } = await GuestActions.getAll()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Results
        data={guests}
        connectedUser={connectedUser}
        refetch={GuestActions.getAll}
        deleteServerAction={GuestActions.del}
      />
    </div>
  )
}

export default GuestsPage
