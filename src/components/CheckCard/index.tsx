import React, { FC, ReactElement } from 'react'
import cx from '@architecturex/utils.cx'

type Props = {
  checked: boolean
  icon: ReactElement
  onChange: () => void
  label: string
}

const CheckCard: FC<Props> = ({ checked, onChange, label, icon }) => {
  return (
    <div
      className={cx.join(
        'relative cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center p-6 pb-4 rounded-lg text-center',
        {
          'bg-gradient-to-r from-blue-500 to-green-500 border-none': checked
        }
      )}
      onClick={onChange}
    >
      {icon}
      <p className={cx.join('font-semibold', checked ? 'text-white' : '')}>{label}</p>
    </div>
  )
}

export default CheckCard
