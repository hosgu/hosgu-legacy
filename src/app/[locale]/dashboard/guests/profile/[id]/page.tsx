import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import { getOneGuestServerAction } from '~/app/actions/dashboard/guest'
import core from '@architecturex/utils.core'
import GuestProfile from '../../../components/Guests/GuestProfile'


type Props = {
  params: {
    locale: Locale
    id: string
  }
}

const GuestProfilePage: FC<Props> = async ({ params: { locale = 'en-us', id } }) => {
  const t = await getI18n(locale)
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
