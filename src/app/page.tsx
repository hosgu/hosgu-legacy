import { NextPage } from 'next'
import { cookies } from 'next/headers'

import UserService from '~/app/shared/services/user'

import Header from '~/app/shared/components/Header'
import Hero from '~/app/shared/components/Hero'
import Blocks from '~/app/shared/components/Blocks'
import Footer from '~/app/shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserService.getOne({
    endpoint: 'user/validate',
    method: 'POST',
    credentials: 'include',
    body: {
      at: cookieStore.get('at')?.value || ''
    },
    returnFirstItemOnly: true
  })
  const locale = cookieStore.get('locale')?.value || 'en-us'

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      <Hero locale={locale} action="save" />
      <Blocks locale={locale} />
      <Footer locale={locale} />
    </>
  )
}

export default Page
