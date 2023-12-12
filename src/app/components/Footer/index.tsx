'use client'
import React, { FC } from 'react'

import { Translations } from '~app/i18n'

import Link from '~components/Link'
import Logo from '~components/Logo'

const currentYear = new Date().getFullYear()

type Props = {
  t: Translations
  locale: string
}

const Footer: FC<Props> = ({ t, locale }) => (
  <footer
    data-component="Footer"
    className="bg-black text-gray-300 py-8 flex flex-col items-center pr-6 md:justify-between md:flex-row"
  >
    <div className="ml-6">
      <Logo style="dark" slogan={t.slogan} />
    </div>
    <ul className="flex-col space-y-4 space-x-0 justify-center items-center ml-8 mt-8 md:mt-0 flex md:flex-row md:space-y-0 md:space-x-4 lg:flex-row lg:space-y-0 lg:space-x-6">
      <li className="hover:text-gray-400 text-center">
        <a href="#" className="text-sm">
          {t.features}
        </a>
      </li>
      <li className="hover:text-gray-400 text-center">
        <a href="#" className="text-sm">
          {t.pricing}
        </a>
      </li>
      <li className="hover:text-gray-400 text-center">
        <Link href="/about" locale={locale} className="text-sm">
          {t.aboutUs}
        </Link>
      </li>
      <li className="hover:text-gray-400 text-center">
        <a href="#" className="text-sm">
          {t.contactUs}
        </a>
      </li>
    </ul>

    <div className="flex justify-center text-sm items-center w-full mt-4 ml-8 md:mt-0 md:w-auto md:justify-end lg:justify-end mt-10">
      © {currentYear} - 1stGuest.com
    </div>
  </footer>
)

export default Footer
