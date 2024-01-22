
import React, { FC, ChangeEvent } from 'react'
import cx from '@architecturex/utils.cx'

type Props = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  helpText?: string
  disabled?: boolean
}

const Checkbox: FC<Props> = ({ checked, onChange, label, helpText, disabled = false }) => {
  const classes = {
    label: 'text-gray-900 dark:text-gray-300',
    disabled: 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
  }

  return (
    <div className="flex" style={{ margin: '0 auto', width: '93%' }}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        <div className="ms-2 text-sm" style={{ marginLeft: '10px' }}>
          <div
            className={cx.join(
              'ms-2 text-sm text-left',
              disabled ? classes.disabled : classes.label,
              helpText ? 'font-medium' : ''
            )}
          >
            {label}
          </div>

          {helpText && (
            <div
              className="text-xs font-normal text-gray-500 dark:text-gray-300"
              style={{ marginLeft: '-10px' }}
            >
              {helpText}
            </div>
          )}
        </div>
      </label>
    </div>
  )
}

export default Checkbox
