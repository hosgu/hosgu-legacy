'use client'
import { FC } from 'react'
import { Button } from '@architecturex/components.button'
import { Locale } from '@architecturex/utils.i18n'

import { Translations } from '~app/i18n'

import { useTheme } from '~contexts/ThemeContext'

import Link from '~components/Link'
import Logo from '~components/Logo'
import Nav from '~components/Nav'
import Dropdown from '~components/Dropdown'

import HamburgerMenu from './HamburgerMenu'
import ThemeSwitcher from './ThemeSwitcher'

type Props = {
  showNav?: boolean
  showSecondaryNav?: boolean
  showHamburgerMenu?: boolean
  showLogin?: boolean
  showLoginButton?: boolean
  showSignup?: boolean
  showTryForFree?: boolean
  connectedUser?: any
  locale: Locale
  logoPosition?: 'below' | 'right'
  t: Translations
}

const Header: FC<Props> = ({
  showNav = true,
  showSecondaryNav = true,
  showHamburgerMenu = true,
  showLogin = true,
  showLoginButton = false,
  showSignup = true,
  showTryForFree = true,
  connectedUser = {},
  locale,
  logoPosition = 'below',
  t
}) => {
  const isLogged = connectedUser?.active

  const { darkMode } = useTheme()

  const loginLink = showLogin ? (
    <Link href="/login" locale={locale}>
      {t.login}
    </Link>
  ) : (
    ''
  )
  const loginButton = showLoginButton ? (
    <Button bold shape="circle" href={`/${locale}/login`} rightSpaces={3}>
      {t.login}
    </Button>
  ) : (
    ''
  )
  const signupLink = showSignup ? (
    <Link href="/signup" locale={locale}>
      {t.signUp}
    </Link>
  ) : (
    ''
  )
  const tryForFreeButton = showTryForFree ? (
    <Button color="secondary" bold shape="circle" href={`/${locale}/signup`} rightSpaces={3}>
      {t.tryForFree}
    </Button>
  ) : (
    ''
  )

  const fullName = connectedUser?.fullName ? connectedUser?.fullName : 'Guest User'
  const name = fullName.split(' ')[0]
  const lastName = fullName.split(' ')[1]

  return (
    <header
      data-component="Header"
      className="max-w-xLarge m-auto bg-white flex items-center justify-between p-4 text-white sticky border-slate-300 dark:bg-black dark:border-slate-600 max-w-3xl"
    >
      <Logo slogan={t.slogan} key={darkMode.toString()} position={logoPosition} />

      {showNav && (
        <Nav
          items={[
            <Link key={t.reservations} href="#">
              {t.reservations}
            </Link>,
            <Link key={t.features} href="#">
              {t.features}
            </Link>,
            <Link key={t.pricing} href="#">
              {t.pricing}
            </Link>,
            <Link key={t.trustedBy} href="#">
              {t.trustedBy}
            </Link>
          ]}
        />
      )}

      <div className="flex justify-between">
        {showSecondaryNav && !isLogged && (
          <div>
            <Nav isSecondaryNav items={[loginLink || loginButton, signupLink, tryForFreeButton]} />
          </div>
        )}

        {isLogged && (
          <div className="flex items-center space-x-2 mr-2">
            <Dropdown
              trigger={
                <div className="cursor-pointer rounded-md text-sm hidden text-gray-600 dark:text-white md:flex outline-none focus:outline-none user-select-none">
                  {name} {lastName}
                </div>
              }
            >
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Profile
              </Link>
              <Link
                href={`${locale}/dashboard`}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Dashboard
              </Link>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                {t.logout}
              </a>
            </Dropdown>
          </div>
        )}

        <div className="ml-2">
          <ThemeSwitcher t={t} />
        </div>

        {showHamburgerMenu && (
          <div className="ml-2 lg:hidden">
            <HamburgerMenu
              t={t}
              locale={locale}
              isLogged={isLogged}
              connectedUser={connectedUser}
            />
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
