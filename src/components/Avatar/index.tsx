import React, { FC } from 'react'

type Props = {
  url?: string
  name?: string
  size?: 'small' | 'medium' | 'large'
}

const Avatar: FC<Props> = ({ url, name = '', size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8 w-8 text-sm',
    medium: 'h-12 w-12 text-lg',
    large: 'h-16 w-16 text-xl'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <>
      {url ? (
        <img
          className={`rounded-full ${sizeClasses[size]} object-contain bg-black`}
          src={url}
          alt={name}
        />
      ) : (
        <div
          className={`rounded-full ${sizeClasses[size]} bg-gray-600 flex items-center justify-center`}
        >
          {name ? getInitials(name) : 'N/A'}
        </div>
      )}
    </>
  )
}

export default Avatar
