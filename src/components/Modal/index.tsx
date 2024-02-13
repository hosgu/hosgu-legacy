import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 w-full overflow-auto bg-black bg-opacity-40 flex dark:bg-black">
      <div className="relative p-4 bg-white dark:bg-gray-900 max-w-md m-auto w-full flex-col flex">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-black dark:text-white -mt-4">
            X
          </button>
        </div>
        <div className="w-full min-h-screen">{children}</div>
      </div>
    </div>
  )
}

export default Modal
