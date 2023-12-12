import React, { FC } from 'react'

type Props = {
  className?: string
  fill?: string
  height?: number
  label?: string
  onClick?: any
  size?: number
  stroke?: string
  width?: number
}

const SVG: FC<Props> = ({
  className = undefined,
  fill = 'none',
  height = 24,
  label = undefined,
  onClick = undefined,
  size = 24,
  stroke = 'black',
  width = 24
}) => (
  <div data-component="SVG.X" className={className} onClick={onClick} title={label}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </div>
)

export default SVG
