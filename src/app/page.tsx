import { NextPage } from 'next'
import { cookies } from 'next/headers'

import * as UserActions from '~/app/shared/actions/user'

import Header from './shared/components/Header'
import Hero from './shared/components/Hero'
import Blocks from './shared/components/Blocks'
import Footer from './shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'

  return (
    <>
      <main className="bg-white dark:bg-black m-auto">
        <Header locale={locale} connectedUser={connectedUser} />
        <Hero locale={locale} action="save" />
        <Blocks locale={locale} />
        <Footer locale={locale} />
      </main>
    </>
  )
}

export default Page
