import { FC } from 'react'

import Reports from '../components/Reports'

const ControlPage: FC = async () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="p-2 dark:text-white w-full">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          <Reports />
        </h1>
      </div>
    </div>
  )
}

export default ControlPage
