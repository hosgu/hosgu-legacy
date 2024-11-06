import { NextPage } from 'next'
import Settings from './components/Settings'

const SettingsPage: NextPage = async () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Settings />
    </div>
  )
}

export default SettingsPage
