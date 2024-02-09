import { NextPage } from 'next'
import core from '@architecturex/utils.core'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { getOneGuestServerAction } from '~/app/shared/actions/dashboard/guest'
import services from '~/app/shared/services'
import EditGuestForm from '~/app/dashboard/components/Guests/Form'

type Props = {
  params: {
    id: string
  }
}

const GuestEditPage: NextPage<Props> = async ({ params: { id = null } }) => {
  const formData = core.formData.set(new FormData(), { id })

  const response = await getOneGuestServerAction(formData)
  const cookieStore = cookies()

  const connectedUser: any = await services.users.connectedUser(cookieStore.get('at')?.value || '')

  if (response.ok && response.data.items) {
    const [guest] = response.data.items

    return (
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
        <EditGuestForm action="edit" data={{ ...guest, businessId: connectedUser.businessId }} />
      </div>
    )
  } else {
    redirect('/404')
  }
}

export default GuestEditPage
