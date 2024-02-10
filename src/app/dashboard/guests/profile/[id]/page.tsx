import { NextPage } from 'next'
import { getOneGuestServerAction } from '~/app/shared/actions/dashboard/guest'
import core from '@architecturex/utils.core'

import GuestProfile from '~/app/dashboard/components/Guests/GuestProfile'

type Props = {
  params: {
    id: string
  }
}

const GuestProfilePage: NextPage<Props> = async ({ params: { id } }) => {
  const formData = core.formData.set(new FormData(), { id })

  const {
    data: {
      ok,
      items: [guest]
    }
  } = await getOneGuestServerAction(formData)

  // TODO: Handle fetch failure
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <GuestProfile data={guest} />
    </div>
  )
}

export default GuestProfilePage
