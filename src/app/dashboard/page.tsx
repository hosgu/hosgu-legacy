import { FC } from 'react'
import Home from '../control/components/Home'

const DashboardPage: FC = async () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-[black]">
      <div className="p-2 dark:text-white w-full">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-slate-300">Dashboard</h1>
        <Home />
      </div>
    </div>
  )
}

export default DashboardPage
