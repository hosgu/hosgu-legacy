import React, { FC } from 'react'

type Props = {
  label?: string
  onClick?: any
  className?: string
}

const SVG: FC<Props> = ({ className = 'h-6 w-6', label = undefined, onClick = undefined }) => (
  <div data-component="SVG.Calendar" onClick={onClick} title={label}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0.00 0.00 446.00 559.00"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        fill="#000000"
        d="
  M 354.53 464.96
  A 57.02 57.02 0.0 0 1 297.51 521.98
  L 129.05 521.98
  A 57.02 57.02 0.0 0 1 72.03 464.96
  L 72.03 114.74
  A 57.02 57.02 0.0 0 1 129.05 57.72
  L 297.51 57.72
  A 57.02 57.02 0.0 0 1 354.53 114.74
  L 354.53 464.96
  Z
  M 258.54 98.78
  L 168.80 98.78
  A 2.80 2.79 -17.1 0 1 166.49 97.56
  L 155.43 81.27
  Q 154.39 79.73 152.53 79.74
  Q 140.97 79.79 129.54 79.84
  C 113.37 79.90 100.16 89.47 95.41 105.14
  Q 94.26 108.93 94.26 123.41
  Q 94.21 289.52 94.26 455.63
  Q 94.26 467.72 94.45 469.38
  C 96.11 483.84 106.54 495.07 120.63 498.81
  Q 124.64 499.87 139.41 499.86
  Q 214.88 499.80 295.90 499.75
  C 298.88 499.75 301.90 499.72 304.84 499.05
  C 321.04 495.36 332.42 481.85 332.43 465.07
  Q 332.50 294.19 332.45 116.09
  C 332.45 108.36 330.87 101.36 326.59 95.19
  Q 316.08 80.04 296.70 79.84
  Q 285.15 79.72 273.61 79.77
  A 2.66 2.65 -73.0 0 0 271.41 80.94
  L 259.58 98.23
  Q 259.20 98.78 258.54 98.78
  Z"
      />
      <rect
        fill="#000000"
        x="-30.37"
        y="-11.06"
        transform="translate(213.27,471.09) rotate(0.1)"
        width="60.74"
        height="22.12"
        rx="10.65"
      />
    </svg>
  </div>
)

export default SVG
