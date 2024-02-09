'use client'
import React, { FC, useState, useRef, useEffect, ReactNode, ReactElement } from 'react'

type DropdownProps = {
  trigger: ReactElement
  children: ReactNode
}

const Dropdown: FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Clone the trigger element to add the 'onClick' property
  const triggerElement = React.cloneElement(trigger, {
    onClick: () => setIsOpen(!isOpen),
    'aria-haspopup': 'true',
    'aria-expanded': isOpen ? 'true' : 'false',
    children: (
      <>
        {trigger.props.children}
        <span
          className={`inline-block ml-2 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ↓
        </span>
      </>
    )
  })

  return (
    <div className="relative" ref={dropdownRef}>
      {triggerElement}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-2xl bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
