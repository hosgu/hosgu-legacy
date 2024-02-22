import { NextPage } from 'next'
import { cookies } from 'next/headers'

import GuestTable from './GuestTable'
import { getConnectedUser } from '~/app/shared/services/users'
import { getAllGuestsServerAction } from '~/app/shared/actions/dashboard/guest'

const GuestsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await getConnectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: guests }
  } = await getAllGuestsServerAction()

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <GuestTable data={guests} connectedUser={connectedUser} refetch={getAllGuestsServerAction} />
    </div>
  )
}

export default GuestsPage
