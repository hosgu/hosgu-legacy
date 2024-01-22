import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import GuestTable from './GuestTable'

type Props = {
  params: {
    locale: Locale
  }
}

const GuestsPage: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const t = await getI18n(locale)
  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday']

  const rows = [
    [
      'Jonh Doe',
      'jonh@doe.com',
      '+1 123 456 78 90',
      'https://j https://y https://t',
      'male',
      '01/01/01'
    ],
    [
      'Mary Doe',
      'jonh@doe.com',
      '+1 123 456 78 90',
      'https://j https://y https://t',
      'male',
      '01/01/01'
    ],
    [
      'Dave Doe',
      'jonh@doe.com',
      '+1 123 456 78 90',
      'https://j https://y https://t',
      'male',
      '01/01/01'
    ]
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <div className="p-2 dark:text-white w-full">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Guests</h1>
      </div>

      <GuestTable headers={headers} rows={rows} />
    </div>
  )
}

export default GuestsPage
