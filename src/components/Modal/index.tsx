import React, { ReactNode, useState } from 'react'
import cx from '@architecturex/utils.cx'

interface ModalProps {
  isModalOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  isFullScreen: boolean
  removeBackground?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen: isOpen,
  onClose,
  title,
  isFullScreen,
  children,
  removeBackground = false
}) => {
  if (!isOpen) return null
  return (
    <div
      className={`fixed inset-0 z-50 w-full overflow-auto ${removeBackground ? 'bg-transparent	' : 'bg-black bg-opacity-40 '} flex  dark:bg-gray `}
    >
      <div
        className={cx.join(
          'relative p-4 bg-white dark:bg-gray-700 max-w-md m-auto  border-2 border-red flex-col flex',
          {
            'w-full': isFullScreen,
            'rounded w-1/3': !isFullScreen
          }
        )}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-black dark:text-white -mt-4">
            X
          </button>
        </div>
        <div className="w-auto h-auto">{children}</div>
      </div>
    </div>
  )
}

export default Modal
