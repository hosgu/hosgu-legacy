import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/shared/actions/user'

import React from 'react'
import Header from '~/app/shared/components/Header'
import Footer from '~/app/shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'
  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      <Footer locale={locale} />
    </>
  )
}

export default Page
