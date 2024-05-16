import { cookies } from 'next/headers'
import * as UserActions from '~/app/shared/actions/user'

import React from 'react'
import Header from '~/app/shared/components/Header'
import Nav from './components/Nav'
import Footer from '~/app/shared/components/Footer'

const BlogLayout = async ({ children }: Props) => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      <Nav />
      {children}
      <Footer locale={locale} />
    </>
  )
}

interface Props {
  children: React.ReactNode
}

export default BlogLayout
