import { GuestFields } from '~/server/db/schemas/guest'

const GuestCard = ({ guest }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 p-6 rounded-lg border border-slate-400 bg-white h-min">
      <img
        src={guest.photo || ''}
        alt="Guest photo"
        className="aspect-square w-16 lg:w-20 rounded-full object-cover self-center bg-gray-100 text-center"
      />
      <div className="leading-none">
        <p className="mb-2 self-center lg:text-2xl">{guest.fullName}</p>
        <p className="text-xs lg:text-base text-slate-500 mb-1 break-words">{guest.email}</p>
        <p className="text-xs lg:text-base text-slate-500">{guest.phone}</p>
      </div>
    </div>
  )
}

type Props = {
  guest: GuestFields
}

export default GuestCard
