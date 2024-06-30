import React, {
  ComponentPropsWithoutRef,
  FC,
  useState,
  ChangeEvent,
  ReactNode,
  useEffect
} from 'react'
import cx from '@architecturex/utils.cx'
import SVG from '@architecturex/components.svg'

const EyeOffIcon = SVG.EyeOff
const EyeIcon = SVG.Eye

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
  dropdownItems?: string[]
}

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
  dropdownItems?: string[]
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
  value = undefined,
  onChange,
  leftIcon = null,
  shape = 'rounded',
  dropdownItems = [],
  ...restProps
}) => {
  const [hasFocus, setHasFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [filteredItems, setFilteredItems] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<any>(value || '')
  const [isError, setIsError] = useState<boolean>(false)
  const [localErrorText, setLocalErrorText] = useState<string>('')

  useEffect(() => {
    if (dropdownItems.length > 0 && inputValue) {
      const filtered = dropdownItems.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredItems(filtered)
    } else if (inputValue === '') {
      setFilteredItems(dropdownItems)
    } else {
      setFilteredItems([])
    }
  }, [inputValue, dropdownItems])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const isPasswordType = type === 'password'
  const inputType = isPasswordType && showPassword ? 'text' : type

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsError(false)
    setLocalErrorText('')
    if (onChange) {
      onChange(e)
    }
  }

  const handleItemClick = (item: string) => {
    setInputValue(item)
    setFilteredItems([])
    setIsError(false)
    setLocalErrorText('')
    if (onChange) {
      onChange({ target: { value: item } } as ChangeEvent<HTMLInputElement>)
    }
  }

  const handleFocus = () => {
    setHasFocus(true)
    if (!inputValue) {
      setFilteredItems(dropdownItems)
    }
  }

  const handleBlur = () => {
    // Close dropdown on input blur
    setTimeout(() => {
      setFilteredItems([])
      setHasFocus(false)
      // Check if the input value is valid only if dropdownItems has items
      if (dropdownItems.length > 0 && inputValue && !dropdownItems.includes(inputValue)) {
        setIsError(true)
        setLocalErrorText('Invalid selection')
      }
    }, 100)
  }

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
            'mt-1 block w-full px-3 py-2 bg-white dark:bg-black border shadow-sm sm:text-sm',
            'text-black dark:text-white',
            shape === 'rounded' ? 'rounded-md' : 'rounded-full',
            disabled ? 'opacity-50 cursor-not-allowed' : null,
            fullWidth ? 'w-full block' : null,
            hasFocus ? 'focus:outline-none focus:ring focus:ring-pacific' : null,
            leftIcon ? 'pl-10' : '',
            className,
            isError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          )}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          value={inputValue}
          disabled={disabled}
          style={isError ? { border: '1px solid red' } : restProps.style}
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

      {hasFocus && filteredItems.length > 0 && (
        <ul
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-black mt-1 max-h-40 overflow-auto absolute w-full z-10"
          style={{ maxHeight: '150px', overflowY: 'scroll' }}
        >
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onMouseDown={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {(errorText || localErrorText) && (
        <div className="text-red-500 text-xs">{errorText || localErrorText}</div>
      )}
    </div>
  )
}

export default Input
