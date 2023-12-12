import { FC } from 'react'
import { cookies } from 'next/headers'

import services from '~/app/services'
import { getI18n, Locale } from '~/app/i18n'

import Header from '~components/Header'
import Hero from '~components/Hero'
import Blocks from '~components/Blocks'
import Footer from '~components/Footer'

type Props = {
  params: {
    locale: Locale
  }
}

const Page: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const cookieStore = cookies()
  const t = await getI18n(locale)
  const connectedUser = await services.users.connectedUser(cookieStore.get('at')?.value || '')

  return (
    <>
      <div className="sticky top-0 z-50 dark:text-white">
        <Header t={t} locale={locale} connectedUser={connectedUser} logoPosition="right" />
      </div>
      <Hero t={t} />
      <Blocks t={t} />
      <Footer t={t} locale={locale} />
    </>
  )
}

export default Page
