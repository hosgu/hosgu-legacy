'use client'

import { FC } from 'react'
import { GuestFields } from '~/server/db/schemas/guest'
import Table from '~/components/Table'

type Props = {
  data: GuestFields
}

const GuestProfile: FC<Props> = ({ data: { fullName, photo, email, phone } }: Props) => {
  const headers = ['Photo', 'Name', 'Discount', 'Booking date', 'Check out date']

  // TODO: Fetch reservations data
  // - The photo property is from the business table
  // - The rest of the properties are from the reservations table
  const response = [
    {
      photo: 'Image URL',
      name: 'Name',
      discount: 'discount',
      bookingDate: 'BookingDate',
      checkoutDate: 'checkOutDate'
    }
  ]

  const rows = response.map((row) => {
    return [
      <img src={row.photo} alt="Business " />,
      row.name,
      row.discount,
      row.bookingDate,
      row.checkoutDate
    ]
  })

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 flex-col">
      <div className="flex gap-4 p-5 rounded-lg border border-slate-400 bg-white">
        <img src={photo || ''} alt="Guest profile" className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-xl">{fullName}</p>
          <p>{email}</p>
          <p className="text-sm">{phone}</p>
        </div>
      </div>
      <div className="p-5 rounded-lg border border-slate-400 bg-white">
        <Table headers={headers} rows={rows} label="Reservation history" />
      </div>
    </div>
  )
}

export default GuestProfile
