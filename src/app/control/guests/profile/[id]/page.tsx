import { NextPage } from 'next'
import core from '@architecturex/utils.core'

import ReservationsTable from '~/app/control/components/Guests/ReservationsTable'
import * as GuestActions from '~/app/core/actions/guest'
import * as ReservationActions from '~/app/core/actions/reservations'

type Params = Promise<{ id: string }>

// TODO: Handle fetch failure
const GuestProfilePage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const formData = core.formData.set(new FormData(), { id })
  const {
    data: {
      items: [guest]
    }
  } = await GuestActions.getOne(formData)

  const reservations = await ReservationActions.getOneByGuestId(guest.id)

  return (
    <div className="h-full max-w- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-[min_content_min-content_min-content] gap-4 md:gap-6 grid-rows-[auto_1fr] p-4 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-[auto_1fr] gap-4 p-6 rounded-lg border border-slate-400 bg-white h-min">
        <img
          src={guest.photo || ''}
          alt="Guest photo"
          className="aspect-square w-16 lg:w-20 rounded-full object-cover self-center"
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
        <div className="flex items-center gap-2 lg:gap-4 mb-4 md:mb-6">
          <p className="lg:text-3xl">Marcella Court</p>
          <div className="border bg-purple-100 text-purple-600 py-1 px-4 text-xs lg:text-base rounded-full">
            Booked
          </div>
        </div>
        <div className="mb-4 lg:mb-6">
          <p className="mb-2 lg:text-2xl">Details</p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1"> Type</p>
              <p className="text-xs lg:text-base">Cabaña</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs lg:text-sm text-slate-500 mb-1"> Capacity</p>
              <p className="text-xs lg:text-base">2 - 4</p>
            </div>
            <div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1"> Booking</p>
              <p className="text-xs lg:text-base">13/06/2024 10:15AM</p>
            </div>
            <div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1"> Check in</p>
              <p className="text-xs lg:text-base">14/06/2024 12:00PM</p>
            </div>
            <div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1"> Check out</p>
              <p className="text-xs lg:text-base">17/06/2024 12:00PM</p>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 lg:text-2xl">Facilities</p>
          <ul className="text-xs lg:text-base grid grid-cols-[30%_1fr] grid-rows-3 gap-x-4 gap-y-1">
            <li>Shower</li>
            <li>Air conditioner</li>
            <li>Fridge</li>
            <li>Kitchen</li>
            <li>Microwave</li>
            <li>Fridge</li>
          </ul>
        </div>
      </div>
      <div className="p-6 rounded-lg border border-slate-400 bg-white  md:col-span-2 lg:col-span-full">
        <ReservationsTable reservations={reservations.ok ? reservations.data.items : []} />
      </div>
    </div>
  )
}

export default GuestProfilePage
