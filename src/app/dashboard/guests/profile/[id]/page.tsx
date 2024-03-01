import { NextPage } from 'next'
import core from '@architecturex/utils.core'
import ReservationsTable from '~/app/dashboard/components/Guests/ReservationsTable'
import { getOneGuestServerAction } from '~/app/shared/actions/dashboard/guest'
import {
  getReservationByIdSeverAction,
  getReservationsByGuestIdServerAction
} from '~/app/shared/actions/reservations'
import { ReservationFields } from '~/server/db/schemas/reservation'
import ReservationCard from '~/app/dashboard/components/Guests/ReservationCard'
import { getEstateByIdServerAction } from '~/app/shared/actions/estate'
import { getReservationById } from '~/app/shared/services/reservations'

type Props = {
  params: {
    id: string
  }
}

const GuestProfilePage: NextPage<Props> = async ({ params: { id } }) => {
  const formData = core.formData.set(new FormData(), { id })

  try {
    var guestResponse = await getOneGuestServerAction(formData)
    if (!guestResponse.ok) throw new Error('Failed to fetch Guest')
    var [guest] = guestResponse.data.items
  } catch (error) {
    console.error('⚠️', error)
    return <div>Error loading data</div>
  }

  const reservationsResponse = await getReservationsByGuestIdServerAction(guest.id)
  const reservations =
    reservationsResponse.ok && reservationsResponse.items ? reservationsResponse.items : []
  const latestReservation = getLatestReservation(reservations)

  return (
    <div className="h-full max-w- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-[min_content_min-content_min-content] gap-4 md:gap-6 grid-rows-[auto_1fr] p-4 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-[auto_1fr] gap-4 p-6 rounded-lg border border-slate-400 bg-white h-min">
        <img
          src={guest.photo || ''}
          alt="Guest photo"
          className="aspect-square w-16 lg:w-20 rounded-full object-cover self-center bg-gray-100"
        />
        <div className="leading-none">
          <p className="mb-2 self-center lg:text-2xl">{guest.fullName}</p>
          <p className="text-xs lg:text-base text-slate-500 mb-1 break-words">{guest.email}</p>
          <p className="text-xs lg:text-base text-slate-500">{guest.phone}</p>
        </div>
      </div>
      <div className="md:aspect-auto md:row-span-2 lg:col-span-2">
        <img
          src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
          alt="Reservation"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      {/* <ReservationCard reservation={latestReservation} /> */}
      {/* <ReservationsTable reservations={reservations} /> */}
    </div>
  )

  async function getLatestReservation(reservations: ReservationFields[]) {
    if (reservations.length == 0) return null

    const lastReservation = reservations.reduce((dateA, dateB) =>
      Date.parse(dateA.endDate) > Date.parse(dateB.endDate) ? dateA : dateB
    )

    const response = await getReservationByIdSeverAction(lastReservation.id)
    return response
  }
}

export default GuestProfilePage
