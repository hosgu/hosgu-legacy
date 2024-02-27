import { NextPage } from 'next'
import { getOneGuestServerAction } from '~/app/shared/actions/dashboard/guest'
import core from '@architecturex/utils.core'
import ReservationsTable from '~/app/dashboard/components/Guests/ReservationsTable'
import { getReservationsByGuestIdServerAction } from '~/app/shared/actions/reservations'
import { ReservationFields } from '~/server/db/schemas/reservation'
import ReservationCard from '~/app/dashboard/components/Guests/ReservationCard'

type Props = {
  params: {
    id: string
  }
}

// TODO: Handle fetch failure
const GuestProfilePage: NextPage<Props> = async ({ params: { id } }) => {
  const formData = core.formData.set(new FormData(), { id })
  const {
    data: {
      ok,
      items: [guest]
    }
  } = await getOneGuestServerAction(formData)

  const reservationsResponse = await getReservationsByGuestIdServerAction(guest.id)
  const reservations = reservationsResponse.data.items

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
      <div className="p-6 rounded-lg border border-slate-400 bg-white">
        <ReservationCard
          reservation={reservationsResponse.ok ? getLatestReservation(reservations) : null}
        />
      </div>
      <div className="p-6 rounded-lg border border-slate-400 bg-white  md:col-span-2 lg:col-span-full">
        <ReservationsTable reservations={reservationsResponse.ok ? reservations : []} />
      </div>
    </div>
  )

  function getLatestReservation(reservations: ReservationFields[]) {
    if (reservations.length == 0) return null
    return reservations.reduce((dateA, dateB) =>
      Date.parse(dateA.endDate) > Date.parse(dateB.endDate) ? dateA : dateB
    )
  }

  function getReservationStatus(startDate: string, endDate: string) {
    if (!startDate) return null
    const today = new Date()
    const reservationStartDate = new Date(startDate)
    const reservationEndDate = new Date(endDate)

    if (today < reservationStartDate)
      return {
        text: 'Booked',
        style: 'bg-purple-100 text-purple-600'
      }
    else if (today > reservationEndDate)
      return {
        text: 'Checked out',
        style: 'bg-pink-100 text-pink-600'
      }
    else if (today >= reservationStartDate && today <= reservationEndDate)
      return {
        text: 'In progress',
        style: 'bg-green-100 text-green-600'
      }
    else
      return {
        text: 'Unknown',
        style: 'bg-gray-100 text-gray-600'
      }
  }
}

export default GuestProfilePage
