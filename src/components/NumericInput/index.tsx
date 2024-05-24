import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import { NumericFormat } from 'react-number-format'

type Props = {
  value: number
  thousandSeparator: string
  allowLeadingZeros: boolean
  prefix: string
  onChange: () => {}
}

const NumericInput: FC<Props> = ({
  value,
  thousandSeparator,
  allowLeadingZeros,
  prefix,
  onChange
}) => {
  return (
    <div className={cx.join('p-4 text-left')}>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300">
        cleaning fee
      </label>
      <NumericFormat
        prefix={prefix}
        className={cx.join(
          'w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg w-lg'
        )}
        value={value}
        allowLeadingZeros={allowLeadingZeros}
        thousandSeparator={thousandSeparator}
        onChange={onChange}
      />
    </div>
  )
}

export default NumericInput
