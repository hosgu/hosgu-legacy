import React, { FC } from 'react'

interface HorizontalMenuProps {
  tabs: Record<string, () => void>
  activeTab: string // Pass activeTab as a prop for consistency
}

const HorizontalMenu: FC<HorizontalMenuProps> = ({ tabs, activeTab }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="inline-flex overflow-x-auto whitespace-nowrap space-x-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={tabs[tab]} // Directly call the onClick function
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? 'bg-white text-blue-500 font-semibold shadow-md dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HorizontalMenu
