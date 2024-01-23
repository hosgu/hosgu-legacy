import { ChangeEvent, FC, useState } from 'react'

type Props = {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'dark' | 'light'
  type?: string
  readOnly?: boolean
  onChange?(e: ChangeEvent<HTMLInputElement>): void
  checked?: boolean
}

const Switcher: FC<Props> = ({
  color = 'primary',
  type = 'round',
  onChange = () => {},
  checked = false
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChecked = (e: any) => {
    setIsChecked(!isChecked)
    onChange(e)
  }

  const styles: any = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    info: 'bg-blue-600',
    dark: 'bg-gray-800',
    light: 'bg-gray-300'
  }

  const sliderStyles = [
    'absolute cursor-pointer top-1 left-0 right-0 bottom-0 bg-gray-500 duration-300before:absolute before::content-[""] before:h-7 before:w-7 before:left-1 before:bottom-1 before:bg-white before:duration-300',
    'absolute cursor-pointer block w-6 h-6 bg-white shadow transform transition ease-in',
    type === 'round' ? 'rounded-3x1 rounded-full' : '',
    isChecked ? 'translate-x-8' : 'translate-x-1'
  ].join(' ')

  const spanStyles =
    type === 'round'
      ? [
          'cursor-pointer block w-13 h-8 rounded-2xl',
          isChecked ? styles[color] : 'bg-gray-500'
        ].join(' ')
      : ['cursor-pointer block w-13 h-8', isChecked ? styles[color] : 'bg-gray-500'].join(' ')

  return (
    <div data-component="Switcher" className="relative inline-block w-auto h-9">
      <label className="relative inline-block w-16 h-6" style={{ width: '62px' }}>
        <input
          type="checkbox"
          onChange={handleChecked}
          checked={isChecked}
          className="hidden w-0 h-0"
        />
        <span className={sliderStyles} />
        <span className={spanStyles} />
      </label>
    </div>
  )
}

export default Switcher
