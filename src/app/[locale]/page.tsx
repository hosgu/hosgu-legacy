import { FC } from 'react'
import { cookies } from 'next/headers'

import services from '~/app/services'
import { getI18n, Locale } from '~/app/i18n'

import Header from '~appComponents/Header'
import Hero from '~appComponents/Hero'
import Blocks from '~appComponents/Blocks'
import Footer from '~appComponents/Footer'

type Props = {
  params: {
    locale: Locale
  }
}

const Page: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const cookieStore = cookies()
  const t = await getI18n(locale)
  const connectedUser = await services.users.connectedUser(cookieStore.get('at')?.value || '')
  console.log(connectedUser)

  return (
    <>
      <div className="sticky top-0 z-50 dark:text-white">
        <Header t={t} locale={locale} connectedUser={connectedUser} />
      </div>
      <Hero t={t} />
      <Blocks t={t} />
      <Footer t={t} locale={locale} />
    </>
  )
}

export default Page
