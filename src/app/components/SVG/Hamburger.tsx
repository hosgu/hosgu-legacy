import React, { FC } from 'react'

type Props = {
  fill?: string
  height?: number
  label?: string
  onClick?: any
  size?: number
  stroke?: string
  width?: number
}

const SVG: FC<Props> = ({ label = undefined, onClick = undefined, stroke = 'black' }) => (
  <div data-component="SVG.Hamburger" onClick={onClick} title={label}>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke={stroke}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </div>
)

export default SVG
