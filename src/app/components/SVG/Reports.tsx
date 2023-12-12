import React, { FC } from 'react'

type Props = {
  label?: string
  onClick?: any
}

const SVG: FC<Props> = ({ label = undefined, onClick = undefined }) => (
  <div data-component="SVG.Reports" onClick={onClick} title={label}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="10" width="4" height="9"></rect>
      <rect x="10" y="8" width="4" height="11"></rect>
      <rect x="14" y="3" width="4" height="16"></rect>

      <line x1="4" y1="20" x2="20" y2="20"></line>
    </svg>
  </div>
)

export default SVG
