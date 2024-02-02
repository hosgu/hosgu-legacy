import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import { getOneGuestServerAction } from '~/app/actions/dashboard/guest'
import core from '@architecturex/utils.core'
import { redirect } from 'next/navigation'
import services from '~/app/services'
import { cookies } from 'next/headers'

import EditGuestForm from './EditGuestForm'

type Props = {
  params: {
    locale: Locale
    id: string
  }
}

const GuestEditPage: FC<Props> = async ({ params: { locale = 'en-us', id = null } }) => {
  const formData = core.formData.set(new FormData(), { id })

  const response = await getOneGuestServerAction(formData)
  const t = await getI18n(locale)
  const cookieStore = cookies()

  const connectedUser: any = await services.users.connectedUser(cookieStore.get('at')?.value || '')

  if (response.ok && response.data.items) {
    const [guest] = response.data.items
    return (
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
        <EditGuestForm data={{ ...guest, businessId: connectedUser.businessId }} />
      </div>
    )
  } else {
    redirect('/404')
  }
}

export default GuestEditPage
