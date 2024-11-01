import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'

import Header from './components/Header'
import * as UserActions from '~/app/core/actions/user'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en-us'
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  const { businessName } = connectedUser

  return (
    <main>
      <div className="flex flex-col h-screen dark:bg-gray-950">
        <Header locale={locale} logoText={businessName} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

export default Layout
