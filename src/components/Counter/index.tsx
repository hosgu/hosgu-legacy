import React, { FC, useState, CSSProperties } from 'react'

type Props = {
  label?: string
  onChange?: (value: number) => void
  spaces?: number
  style?: CSSProperties
  max?: number
  defaultValue?: number
}

const nbsp = ' '

const Counter: FC<Props> = ({
  label,
  spaces = 0,
  onChange,
  max = 99,
  defaultValue = 0,
  style = { width: '135px' }
}) => {
  const [count, setCount] = useState<number>(defaultValue)

  const increment = () => {
    if (count < max) {
      setCount((prevCount) => prevCount + 1)
      onChange && onChange(count + 1)
    }
  }

  const decrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
      onChange && onChange(count - 1)
    }
  }

  return (
    <div className="h-10 flex items-center" style={style}>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={decrement}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="focus:outline-none text-center w-full rounded-none bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={count}
          readOnly
          style={{ paddingLeft: '10px' }}
        />
        <button
          data-action="increment"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={increment}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>

      <span className="ml-2">
        {label}
        {nbsp.repeat(spaces)}
      </span>
    </div>
  )
}

export default Counter
