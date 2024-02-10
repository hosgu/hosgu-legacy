import { NextPage } from 'next'
import { cookies } from 'next/headers'

import { getConnectedUser } from '~/app/shared/services/users'

import Header from '~/app/shared/components/Header'
import Hero from '~/app/shared/components/Hero'
import Blocks from '~/app/shared/components/Blocks'
import Footer from '~/app/shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      <Hero locale={locale} />
      <Blocks locale={locale} />
      <Footer locale={locale} />
    </>
  )
}

export default Page
