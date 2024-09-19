import React, { ReactNode } from 'react'
import cx from '@architecturex/utils.cx'

interface ModalProps {
  isModalOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  isFullScreen?: boolean
  removeBackground?: boolean
  wrapContent?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen: isOpen,
  onClose,
  title,
  isFullScreen = false,
  children,
  removeBackground = false,
  wrapContent = false
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 w-full overflow-auto ${
        removeBackground ? 'bg-transparent' : 'bg-black bg-opacity-40'
      } flex dark:bg-gray`}
    >
      <div
        className={cx.join(
          'relative p-4 bg-white dark:bg-gray-800',
          isFullScreen ? 'w-full h-[100vh]' : 'w-3/4 lg:max-w-md lg:rounded lg:w-1/3 m-auto',
          'max-h-[100vh] overflow-y-auto border-2 border-red flex-col flex'
        )}
      >
        {/* Wrapping content inside the modal */}
        <div className={wrapContent ? 'px-[10%]' : ''}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button onClick={onClose} className="text-black dark:text-white -mt-4">
              X
            </button>
          </div>
          <div className="w-auto h-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
