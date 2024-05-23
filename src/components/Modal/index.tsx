import React, { ReactNode, useState } from 'react'
import cx from '@architecturex/utils.cx'

interface ModalProps {
  isModalOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  isfullScreen: boolean
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen: isOpen,
  onClose,
  title,
  isfullScreen,
  children
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 w-full overflow-auto bg-black bg-opacity-40 flex dark:bg-black">
      <div
        className={cx.join(
          'relative p-4 bg-white dark:bg-gray-900 max-w-md m-auto  flex-col flex',
          {
            'w-full': isfullScreen,
            'rounded w-1/3': !isfullScreen
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
