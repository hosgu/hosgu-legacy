import SVG from '@architecturex/components.svg'
import { ReservationFields } from '~/server/db/schemas/reservation'
import { Amenities, PropertyFields } from '~/server/db/schemas/property'

async function ReservationCard({ data }: Props) {
  if (!data)
    return (
      <div className="p-6 rounded-lg border border-slate-400 bg-white flex flex-col justify-center items-center">
        <SVG.NoData />
        <div className="text-gray-300">No data</div>
      </div>
    )

  const { reservation, property } = data
  const reservationStatus = getReservationStatus(reservation.startDate, reservation.endDate)
  const propertyAmenities = getAmenities(
    property.amenities ? JSON.parse(property.amenities as unknown as string) : []
  )

  return (
    <div className="p-6 rounded-lg border border-slate-400 bg-white">
      <div className="flex items-center gap-2 lg:gap-4 mb-4 md:mb-6">
        <p className="lg:text-3xl">{property.name}</p>
        <div
          className={`border py-1 px-4 text-xs lg:text-base rounded-full ${reservationStatus.style}`}
        >
          {reservationStatus.text}
        </div>
      </div>
      <div className="mb-4 lg:mb-6">
        <p className="mb-2 lg:text-2xl">Details</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1">Type</p>
            <p className="text-xs lg:text-base">{property.type}</p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1">Occupancy</p>
            <p className="text-xs lg:text-base">
              {Number(reservation.occupancy) + Number(reservation.extraOccupancy)}
            </p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1">Created at</p>
            <p className="text-xs lg:text-base">{formatDate(reservation.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1">Check in</p>
            <p className="text-xs lg:text-base">{`${reservation.startDate} ${property.checkIn}`}</p>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-slate-500 mb-1">Check out</p>
            <p className="text-xs lg:text-base">{`${reservation.endDate} ${property.checkOut}`}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2 lg:text-2xl">Amenities</p>
        <ul className="text-xs lg:text-base columns-3">{propertyAmenities}</ul>
      </div>
    </div>
  )

  function formatDate(date: string | Date) {
    const newDate = new Date(date)
    return newDate.toISOString().split('T')[0]
  }

  function getAmenities(amenities: Amenities) {
    const existingAmenities = amenities.filter((amenity) => amenity.exists)
    return existingAmenities.map((amenity) => (
      <li key={amenity.name} className="mb-2 ml-3 list-disc marker:text-slate-500">
        {amenity.name}
      </li>
    ))
  }

  function getReservationStatus(startDate: string, endDate: string) {
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
        style: 'bg-blue-100 text-blue-600'
      }
    else {
      return {
        text: 'Unknown',
        style: 'bg-gray-100 text-gray-600'
      }
    }
  }
}

type Props = {
  data: { reservation: ReservationFields; property: PropertyFields }
}

export default ReservationCard
