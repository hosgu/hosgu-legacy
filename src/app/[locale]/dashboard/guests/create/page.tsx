import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import CreateGuestForm from './CreateGuestForm'
import services from '~/app/services'
import { cookies } from 'next/headers'

type Props = {
  params: {
    locale: Locale
  }
}

const GuestsCreatePage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)
  const cookieStore = cookies()

  const connectedUser = await services.users.connectedUser(cookieStore.get('at')?.value || '')

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm connectedUser={connectedUser} />
    </div>
  )
}

export default GuestsCreatePage
