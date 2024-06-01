import { FC, ReactElement } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Header from './components/Header'
import Reports from './components/Reports'
import * as UserActions from '~/app/shared/actions/user'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en-us'
  // const user = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')

  // if (!user) {
  //   redirect('/')
  // }

  return (
    <main>
      <div className="flex flex-col h-screen">
        <Header locale={locale} page="dashboard" />
        <div className="flex-1 overflow-y-auto">
          <Reports />
        </div>
      </div>
    </main>
  )
}

export default Layout
