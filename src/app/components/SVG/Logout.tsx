import React, { FC } from 'react'

type Props = {
  label?: string
  onClick?: any
}

const SVG: FC<Props> = ({ label = undefined, onClick = undefined }) => (
  <div data-component="SVG.Settings" onClick={onClick} title={label}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  </div>
)

export default SVG
