import React, { useEffect, useState } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, duration = 4000 }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, duration)

    const closeTimer = setTimeout(() => {
      onClose()
    }, duration + 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(closeTimer)
    }
  }, [onClose, duration])

  return (
    <div
      className={`w-full absolute top-0 mt-[-100px] right-0 alert ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 flex items-center justify-between transform transition-all duration-500 ${show ? 'mt-0' : 'mt-[-100px]'}`}
    >
      <span className="text-sm">{message}</span>
      <button onClick={() => setShow(false)} className="text-lg ml-2">
        &times;
      </button>
    </div>
  )
}

export default Notification
