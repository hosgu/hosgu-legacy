import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import GuestTable from './GuestTable'
import { getAllGuestsServerAction } from '~/app/actions/dashboard/guest'

type Props = {
  params: {
    locale: Locale
  }
}

const GuestsPage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)
  const {
    data,
    data: {
      items: guests,
      pagination: { totalItems }
    }
  } = await getAllGuestsServerAction()
  // console.log('DATA: ', data)
  
  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday']

  const rows = guests.map(({ fullName, email, phone, website, gender, birthday }: any) => [
    fullName,
    email,
    phone,
    website,
    gender,
    birthday
  ])

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <GuestTable headers={headers} rows={rows} />
    </div>
  )
}

export default GuestsPage
