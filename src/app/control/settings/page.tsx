import { NextPage } from 'next'
import { cookies } from 'next/headers'

import Settings from './components/Settings'

import * as UserActions from '~/app/core/actions/user'
import * as SettingActions from '~/app/core/actions/setting'

const SettingsPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  const settings = await SettingActions.getOne(connectedUser.id)
  console.log('SETTINGS ====>', settings)
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Settings />
    </div>
  )
}

export default SettingsPage
