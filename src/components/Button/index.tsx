import React, { FC, ComponentPropsWithoutRef } from 'react'
import cx from '@architecturex/utils.cx'

interface Props extends ComponentPropsWithoutRef<'button'> {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  variant?: 'contained' | 'outlined' | 'transparent'
  shape?: 'regular' | 'rounded' | 'circle' | 'square'
  frontColor?: string
  hoverColor?: string
  href?: string
  target?: string
  fullWidth?: boolean
  disabled?: boolean
  bold?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button: FC<Props> = ({
  color = 'primary',
  size = 'medium',
  variant = 'contained',
  shape = 'regular',
  frontColor,
  hoverColor,
  href,
  target,
  fullWidth = false,
  disabled = false,
  bold = false,
  isLoading = false,
  loadingText = 'Loading...',
  children,
  onClick = () => {}
}) => {
  const baseClasses = 'p-2 text-center transition duration-300'
  const sizeClasses = {
    small: 'px-2 py-1.5 text-xs',
    medium: 'px-6 py-2.5 text-sm',
    large: 'px-6 py-3.5 text-base',
    xlarge: 'px-8 py-4 text-lg'
  }
  const shapeClasses = {
    regular: 'rounded',
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    square: 'rounded-none'
  }
  const colorClasses: any = {
    primary: {
      contained: 'bg-dodger hover:bg-cerulean text-white',
      outlined:
        'bg-white hover:bg-cerulean text-cerulean border border-cerulean hover:border-cerulean hover:text-white',
      text: 'bg-white hover:bg-cerulean text-cerulean'
    },
    secondary: {
      contained: 'bg-green-600 hover:bg-green-700 text-white',
      outlined:
        'bg-white hover:bg-forest text-forest border border-forest hover:border-forest hover:text-white',
      text: 'bg-white hover:bg-forest text-forest'
    },
    success: {
      contained: 'bg-emerald hover:bg-forest text-white',
      outlined:
        'bg-white hover:bg-emerald text-emerald border border-emerald hover:border-emerald hover:text-white',
      text: 'bg-white hover:bg-emerald text-emerald'
    },
    danger: {
      contained: 'bg-cinnabar hover:bg-thunderbird text-white',
      outlined:
        'bg-white hover:bg-thunderbird text-thunderbird border border-thunderbird hover:border-thunderbird hover:text-white',
      text: 'bg-white hover:bg-thunderbird text-thunderbird'
    },
    info: {
      contained: 'bg-blue-500 hover:bg-blue-600 text-white',
      outlined:
        'bg-white hover:bg-blue-600 text-blue-600 border border-blue-600 hover:border-blue-600 hover:text-white',
      text: 'bg-white hover:bg-blue-600 text-blue-600'
    },
    warning: {
      contained: 'bg-orange hover:bg-fire text-white',
      outlined:
        'bg-white hover:bg-fire text-fire border border-fire hover:border-fire hover:text-white',
      text: 'bg-white hover:bg-fire text-fire'
    },
    light: {
      contained: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
      outlined:
        'bg-white hover:bg-gray-100 text-gray-900 border border-gray-100 hover:border-gray-200 hover:text-white',
      text: 'bg-white hover:bg-gray-100 text-gray-900'
    },
    dark: {
      contained: 'bg-gray-900 hover:bg-gray-800 text-gray-100',
      outlined:
        'bg-white hover:bg-gray-900 text-gray-900 border border-gray-900 hover:border-gray-800 hover:text-white',
      text: 'bg-white hover:bg-gray-900 text-gray-100'
    }
  }
  const fullWidthClass = fullWidth ? 'w-full' : ''
  const boldClass = bold ? 'font-bold' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    colorClasses[color][variant],
    fullWidthClass,
    boldClass,
    disabledClass
  ].join(' ')

  const content = isLoading ? loadingText : children

  return href ? (
    <a
      href={disabled ? undefined : href}
      target={target}
      className={cx.join(buttonClasses, 'hover:no-underline')}
      style={{ color: frontColor, backgroundColor: hoverColor }}
      aria-disabled={disabled}
    >
      {content}
    </a>
  ) : (
    <button
      className={buttonClasses}
      style={{ color: frontColor, backgroundColor: hoverColor }}
      disabled={disabled}
      onClick={onClick || undefined}
    >
      {content}
    </button>
  )
}

export default Button
