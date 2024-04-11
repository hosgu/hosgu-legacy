import React, { FC, ChangeEvent } from 'react'
import Image from 'next/image'

type Props = {
  checked: boolean
  icon: string
  onChange: () => void
  label?: string
  helpText?: string
  disabled?: boolean
}

const CheckCard: FC<Props> = ({ checked, onChange, label, helpText, disabled = false, icon }) => {
  return (
    <div
      className={`w-1/4 cursor-pointer ${checked ? 'bg-green-600 border-white text-white' : 'bg-transparent'} m-5 py-2 px-2  border-solid border-2 border-gray-400	 rounded-md  text-left
        hover:bg-green-600 hover:border-blue-50 active:bg-slate-50
      `}
      onClick={onChange}
    >
      <Image src={icon} className=" w-[3vw] " alt={`${helpText}`} width={80} height={64} />
      {label}
    </div>
  )
}

export default CheckCard
