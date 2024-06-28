import React, { ComponentPropsWithoutRef, FC, useState, ChangeEvent, ReactNode } from 'react'
import cx from '@architecturex/utils.cx'

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string
  fullWidth?: boolean
  error?: boolean
  errorText?: string
  countryCodes?: { [code: string]: string }
  countryCodeValue?: string
  onCountryCodeChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  leftIcon?: ReactNode
  shape?: 'rounded' | 'pill'
}

const Input: FC<Props> = ({
  className = '',
  disabled = false,
  error = false,
  errorText = '',
  fullWidth = false,
  name = '',
  label = '',
  type = 'text',
  value = '',
  onChange,
  leftIcon = null,
  shape = 'rounded',
  ...restProps
}) => {
  const hasError = error || errorText
  const [hasFocus, setHasFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const isPasswordType = type === 'password'
  const inputType = isPasswordType && showPassword ? 'text' : type

  return (
    <div data-component="Input" className={cx.join('text-left', fullWidth ? 'w-full block' : null)}>
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold text-left dark:text-gray-300"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="flex relative">
        {leftIcon && (
          <button
            type="button"
            className="absolute inset-y-0 left-2 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
            style={{ top: '3px' }}
          >
            {leftIcon}
          </button>
        )}

        <input
          autoComplete={name === 'password' ? 'new-password' : 'off'}
          name={name}
          className={cx.join(
            'mt-1 block w-full px-3 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm',
            'text-black dark:text-white',
            shape === 'rounded' ? 'rounded-md' : 'rounded-full',
            disabled ? 'opacity-50 cursor-not-allowed' : null,
            fullWidth ? 'w-full block' : null,
            hasFocus ? 'focus:outline-none focus:ring focus:ring-pacific' : null,
            leftIcon ? 'pl-10' : '',
            className
          )}
          type={inputType}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          onChange={onChange}
          value={value || undefined}
          disabled={disabled}
          style={hasError ? { border: '1px solid red' } : restProps.style}
          {...restProps}
        />
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            title={showPassword ? 'Hide password' : 'Show password'}
            style={{ top: '3px' }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {errorText && <div className="text-red-500 text-xs">{errorText}</div>}
    </div>
  )
}

export default Input
