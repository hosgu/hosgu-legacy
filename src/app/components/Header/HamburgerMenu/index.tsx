'use client'
import React, { FC, useState } from 'react'
import { Locale } from '@architecturex/utils.i18n'

import { Translations } from '~app/i18n'

import Link from '~components/Link'
import Hamburger from '~components/SVG/Hamburger'
import X from '~components/SVG/X'
import { useTheme } from '~contexts/ThemeContext'
import { User } from '~/types'

type Props = {
  t: Translations
  isLogged: boolean
  connectedUser: User
  locale: Locale
}

const HamburgerMenu: FC<Props> = ({ t, isLogged, locale, connectedUser }) => {
  const { darkMode } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const stroke = darkMode ? '#fff' : '#000'

  return (
    <div data-component="HamburgerMenu">
      <Hamburger label="Open Menu" stroke={stroke} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="bg-white fixed h-full left-0 top-0 w-full z-50 dark:bg-black">
          <X
            label="Close"
            className="absolute focus:outline-none right-4 top-4"
            onClick={() => setIsOpen(false)}
            stroke={stroke}
          />

          {isLogged && (
            <div className="flex flex-col items-center justify-center pt-20 text-black dark:text-white text-xl">
              <div className="mb-10">
                <b>{t.welcome},</b> {connectedUser.information.fullName}!
              </div>

              <Link
                href="#"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                Profile
              </Link>
              <Link
                href={`${locale}/dashboard`}
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                Dashboard
              </Link>
              <a
                href="/logout"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                {t.logout}
              </a>
            </div>
          )}

          <div className={!isLogged ? 'pt-20' : ''}>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t.reservations}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t.features}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t.pricing}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t.trustedBy}
            </Link>
            <Link
              href="/login"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              {t.login}
            </Link>
            <Link
              href="/signup"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              {t.signUp}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
