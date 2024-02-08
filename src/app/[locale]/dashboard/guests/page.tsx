import { FC } from 'react'
import { cookies } from 'next/headers'

import { getI18n, Locale } from '~/app/i18n'
import services from '~/app/services'
import GuestTable from './GuestTable'
import { getAllGuestsServerAction } from '~/app/actions/dashboard/guest'
import { revalidateCacheByTag } from '~/app/actions/cache'

type Props = {
  params: {
    locale: Locale
  }
}

const GuestsPage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)
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
