import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Header from '~/app/shared/components/Header'
import Sidebar from './components/Sidebar'

import services from '~/app/shared/services'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ params, children }) => {
  const cookieStore = cookies()
  const at = cookieStore.get('at')?.value
  const user = await services.users.connectedUser(at)

  if (!user) {
    redirect('/')
  }

  const business = await services.business.getBusiness(user.id)

  return (
    <main>
      <div className="flex flex-col h-screen">
        <Header t={t} locale="en-us" page="dashboard" />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default Layout
