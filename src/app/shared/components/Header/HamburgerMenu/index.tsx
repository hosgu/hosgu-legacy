'use client'
import React, { FC, useState } from 'react'
import SVG from '@architecturex/components.svg'

import i18n, { Locale } from '~/app/shared/contexts/server/I18nContext'
import Link from '~/app/shared/components/Link'
import { useTheme } from '~/app/shared/contexts/client/ThemeContext'

type Props = {
  isLogged: boolean
  connectedUser: any
  locale: Locale
}

const HamburgerMenu: FC<Props> = ({ isLogged, locale, connectedUser }) => {
  const t = i18n(locale)
  const { darkMode } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const stroke = darkMode ? 'white' : 'black'

  return (
    <div data-component="HamburgerMenu">
      <SVG.Hamburger label="Open Menu" color={stroke} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="bg-white fixed h-full left-0 top-0 w-full z-50 dark:bg-black">
          <SVG.X label="Close" onClick={() => setIsOpen(false)} color={stroke} />

          {isLogged && (
            <div className="flex flex-col items-center justify-center pt-20 text-black dark:text-white text-xl">
              <div className="mb-10">
                <b>welcome,</b> {connectedUser.fullName}!
              </div>

              <Link
                href="#"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                profile
              </Link>
              <Link
                href="/dashboard"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                dashboard
              </Link>
              <a
                href="/logout"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                logout
              </a>
            </div>
          )}

          <div className={!isLogged ? 'pt-20' : ''}>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              reservations
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              features
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              pricing
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              trustedBy
            </Link>
            <Link
              href="/login"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              login
            </Link>
            <Link
              href="/signup"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              signUp
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
