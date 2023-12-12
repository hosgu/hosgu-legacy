import React, { FC } from 'react'

type Props = {
  className?: string
  label?: string
  onClick?: any
  isDark?: boolean
}

const SVG: FC<Props> = ({ className = undefined, onClick = undefined, isDark = false }) => {
  const bg = isDark ? '#fff' : '#222'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0.00 0.00 898.00 876.00"
      className={className}
      onClick={onClick}
    >
      <path
        fill={bg}
        d="
  M 214.02 247.94
  A 0.31 0.31 0.0 0 0 213.51 247.71
  L 124.43 326.01
  A 0.52 0.52 0.0 0 1 123.70 325.96
  L 6.67 192.80
  A 0.42 0.41 -41.6 0 1 6.71 192.21
  L 217.89 6.60
  Q 218.27 6.26 218.78 6.26
  L 392.01 6.26
  A 0.25 0.24 90.0 0 1 392.25 6.51
  L 392.25 232.00
  A 0.24 0.23 76.3 0 0 392.59 232.21
  C 548.75 149.51 741.30 198.65 837.58 347.40
  C 873.93 403.56 892.16 468.59 891.49 535.49
  C 890.06 679.05 795.58 808.42 658.53 852.94
  C 482.52 910.13 294.25 817.14 232.77 643.01
  C 220.66 608.70 214.05 571.03 214.05 533.88
  Q 214.09 390.84 214.02 247.94
  Z
  M 713.49 530.98
  A 160.78 160.78 0.0 0 0 552.71 370.20
  A 160.78 160.78 0.0 0 0 391.93 530.98
  A 160.78 160.78 0.0 0 0 552.71 691.76
  A 160.78 160.78 0.0 0 0 713.49 530.98
  Z"
      />
    </svg>
  )
}

export default SVG
