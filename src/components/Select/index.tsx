import React from 'react'
import cx from '@architecturex/utils.cx'

interface SelectProps {
  options: { value: string; label: string }[]
  placeholder?: string
  name?: string
  label?: string
  fullWidth?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  fullWidth = false,
  placeholder
}) => {
  return (
    <div className={cx.join('p-4 text-left', fullWidth ? 'w-full block' : null)}>
      <div>
        {label && (
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
            htmlFor={name}
          >
            {label}
          </label>
        )}{' '}
      </div>
      <div className="flex relative ">
        <select
          className="h-12 w-full rounded-lg border border-transparent indent-4 shadow-lg focus:outline-none focus:ring focus:ring-pacific dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none"
          defaultValue=""
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.95 7.05a.75.75 0 01 1.06 0l3 3 3-3a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z" />
        </svg>
      </div>
    </div>
  )
}

export default Select
