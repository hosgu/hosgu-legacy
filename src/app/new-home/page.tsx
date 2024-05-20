import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/shared/actions/user'

import Header from './Header'
import Hero from './Hero'
import Blocks from './Blocks'
import Footer from './Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />

      <main className="bg-white max-w-[1920px] m-auto">
        <Hero locale={locale} action="save" />
        <Blocks locale={locale} />
        <Footer locale={locale} />
      </main>
    </>
  )
}

export default Page
