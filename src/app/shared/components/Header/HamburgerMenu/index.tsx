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
      <SVG.Hamburger label="Open Menu" stroke={stroke} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="bg-white fixed h-full left-0 top-0 w-full z-50 dark:bg-black">
          <SVG.X
            label="Close"
            className="absolute focus:outline-none right-4 top-4"
            onClick={() => setIsOpen(false)}
            stroke={stroke}
          />

          {isLogged && (
            <div className="flex flex-col items-center justify-center pt-20 text-black dark:text-white text-xl">
              <div className="mb-10">
                <b>{t('welcome')},</b> {connectedUser.fullName}!
              </div>

              <Link
                href="#"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                {t('profile')}
              </Link>
              <Link
                href="/dashboard"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                {t('dashboard')}
              </Link>
              <a
                href="/logout"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                {t('logout')}
              </a>
            </div>
          )}

          <div className={!isLogged ? 'pt-20' : ''}>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t('reservations')}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t('features')}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t('pricing')}
            </Link>
            <Link href="#" className="block mb-4 text-black text-center text-xl dark:text-white">
              {t('trustedBy')}
            </Link>
            <Link
              href="/login"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              {t('login')}
            </Link>
            <Link
              href="/signup"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              {t('signUp')}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu
