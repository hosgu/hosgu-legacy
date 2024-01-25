import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import CreateGuestForm from './CreateGuestForm'
type Props = {
  params: {
    locale: Locale
  }
}

const GuestsCreatePage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm />
    </div>
  )
}

export default GuestsCreatePage
