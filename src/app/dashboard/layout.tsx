import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Header from '~/app/shared/components/Header'
import Sidebar from './components/Sidebar'

import * as UserActions from '~/app/shared/actions/user'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en-us'
  const user = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  if (!user) {
    redirect('/')
  }

  return (
    <main>
      <div className="flex flex-col h-screen">
        <Header locale={locale} page="dashboard" />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-gray-100">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default Layout
