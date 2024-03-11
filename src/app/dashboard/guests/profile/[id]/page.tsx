import { NextPage } from 'next'
import core from '@architecturex/utils.core'
import { ReservationFields } from '~/server/db/schemas/reservation'

import * as GuestActions from '~/app/shared/actions/guest'
import * as ReservationActions from '~/app/shared/actions/reservations'
import ReservationsTable from '~/app/dashboard/components/Guests/ReservationsTable'
import ReservationCard from '~/app/dashboard/components/Guests/ReservationCard'
import GuestCard from '~/app/dashboard/components/Guests/GuestCard'

type Props = {
  params: {
    id: string
  }
}

const GuestProfilePage: NextPage<Props> = async ({ params: { id } }) => {
  const formData = core.formData.set(new FormData(), { id })

  try {
    var guestResponse = await GuestActions.getOne(formData)
    if (!guestResponse.ok || !guestResponse.items) {
      throw new Error()
    }
    var [guest] = guestResponse.items
  } catch (error) {
    console.error(error)
    return <div>Fetch guest error</div>
  }

  const reservationsResponse = await ReservationActions.getAllByGuestId(guest.id)
  const reservations = reservationsResponse.ok ? reservationsResponse.items : []
  const latestReservation = await getLatestReservation(reservations)

  return (
    <div className="h-full max-w- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-[min_content_min-content_min-content] gap-4 md:gap-6 grid-rows-[auto_1fr] p-4 bg-gray-100 dark:bg-gray-900">
      <GuestCard guest={guest} />
      <div className="md:aspect-auto md:row-span-2 lg:col-span-2">
        <img
          src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
          alt="Reservation"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <ReservationCard data={latestReservation} />
      <ReservationsTable reservations={reservations} />
    </div>
  )

  async function getLatestReservation(reservations: ReservationFields[]) {
    if (reservations.length == 0) return null

    const latestReservation = reservations.reduce((dateA, dateB) =>
      Date.parse(dateA.endDate) > Date.parse(dateB.endDate) ? dateA : dateB
    )

    const response = await ReservationActions.getOne(
      latestReservation.id,
      `/reservation/${latestReservation.id}?card=true`
    )

    return response.ok && response.items.length ? response.items[0] : null
  }
}

export default GuestProfilePage
