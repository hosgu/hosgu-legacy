import { NextPage } from 'next'
import core from '@architecturex/utils.core'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { getOneGuest } from '~/app/shared/actions/dashboard/guest'
import UserService from '~/app/shared/services/user'
import EditGuestForm from '~/app/dashboard/components/Guests/Form'

type Props = {
  params: {
    id: string
  }
}

const GuestEditPage: NextPage<Props> = async ({ params: { id = null } }) => {
  const formData = core.formData.set(new FormData(), { id })
  const response = await getOneGuest(formData)
  const cookieStore = cookies()
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at: cookieStore.get('at')?.value || ''
    },
    returnFirstItemOnly: true
  })

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
