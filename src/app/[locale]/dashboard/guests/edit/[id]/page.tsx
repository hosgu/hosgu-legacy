import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import { getOneGuestServerAction } from '~/app/actions/dashboard/guest'
import core from '@architecturex/utils.core'
import { redirect } from 'next/navigation'

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

  if (response.ok && response.data.items) {
    const [guest] = response.data.items
    return (
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
        <EditGuestForm data={guest} />
      </div>
    )
  } else {
    redirect('/404')
  }
}

export default GuestEditPage
