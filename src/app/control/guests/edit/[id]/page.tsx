import { NextPage } from 'next'
import core from '@architecturex/utils.core'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import * as GuestActions from '~/app/core/actions/guest'
import * as UserActions from '~/app/core/actions/user'
import EditGuestForm from '~/app/control/components/Guests/Form'

type Params = Promise<{ id: string }>

const GuestEditPage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const formData = core.formData.set(new FormData(), { id })
  const response = await GuestActions.getOne(formData)
  const cookieStore = await cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

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
