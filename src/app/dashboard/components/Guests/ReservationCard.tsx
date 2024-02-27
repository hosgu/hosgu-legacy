import { ReservationFields } from '~/server/db/schemas/reservation'

function ReservationCard({ reservation, reservationStatus }: Props) {
  return (
    <>
      <div className="flex items-center gap-2 lg:gap-4 mb-4 md:mb-6">
        <p className="lg:text-3xl">Marcella Court</p>
        <div
          // className={`border py-1 px-4 text-xs lg:text-base rounded-full ${reservationStatus.style}`}
        >
          {/* {reservationStatus.text} */}
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
            <p className="text-xs lg:text-base">{}</p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1"> Check in</p>
            <p className="text-xs lg:text-base">{reservation.startDate}</p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1"> Check out</p>
            <p className="text-xs lg:text-base">{reservation.endDate}</p>
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
    </>
  )
}

type Props = {
  reservation: ReservationFields | null
  // reservationStatus: { text: string; style: string }
}

export default ReservationCard
