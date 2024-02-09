import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Header from '~/app/shared/components/Header'
import Sidebar from './components/Sidebar'

import { getConnectedUser } from '~/app/shared/services/users'
import { getBusiness } from '~/app/shared/services/business'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const at = cookieStore.get('at')?.value
  const locale = cookieStore.get('locale')?.value || 'en-us'
  const user = await getConnectedUser(at)

  if (!user) {
    redirect('/')
  }

  const business = await getBusiness(user.id)

  return (
    <main>
      <div className="flex flex-col h-screen">
        <Header locale={locale} page="dashboard" />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default Layout
