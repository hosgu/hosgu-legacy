import { NextPage } from 'next'
import { cookies } from 'next/headers'

import services from '~/app/shared/services'
import { getAllGuestsServerAction } from '~/app/shared/actions/dashboard/guest'
import { revalidateCacheByTag } from '~/app/shared/actions/cache'
import GuestTable from './GuestTable'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await services.users.connectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: guests }
  } = await getAllGuestsServerAction()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <GuestTable
        data={guests}
        connectedUser={connectedUser}
        serverActions={{ revalidateCacheByTag }}
      />
    </div>
  )
}

export default GuestsPage
