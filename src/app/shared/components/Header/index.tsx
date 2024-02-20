'use client'
import { FC } from 'react'
import cx from '@architecturex/utils.cx'
import { RenderIf } from '@architecturex/components.renderif'

import i18n, { Locale } from '~/app/shared/contexts/server/I18nContext'
import { useTheme } from '~/app/shared/contexts/client/ThemeContext'
import Link from '~/app/shared/components/Link'
import Logo from '~/app/shared/components/Logo'
import Nav from '~/app/shared/components/Nav'
import Dropdown from '~/components/Dropdown'
import Button from '~/components/Button'
import Avatar from '~/components/Avatar'

import HamburgerMenu from './HamburgerMenu'
import ThemeSwitcher from './ThemeSwitcher'

type Props = {
  connectedUser?: any
  locale: Locale
  page?: string
}

const Header: FC<Props> = ({ connectedUser = {}, locale, page }) => {
  const t = i18n(locale)
  const isLogged = connectedUser?.active
  const showLogin = !isLogged && page !== 'dashboard'
  const showTryForFree = !isLogged && page !== 'dashboard'
  const showSecondaryNav = page !== 'dashboard'
  const showHamburgerMenu = page !== 'dashboard'

  const { darkMode } = useTheme()

  const handleTryFree = () => {
    const inputElement = document.getElementById('fullName')

    if (inputElement) {
      inputElement.focus()
    }
  }

  const loginLink = showLogin ? <Link href="/login">{t('login')}</Link> : ''

  const tryForFreeButton = showTryForFree ? (
    <Button color="secondary" bold shape="circle" onClick={handleTryFree}>
      {t('tryForFree')}
    </Button>
  ) : (
    ''
  )

  const fullName = connectedUser?.fullName ? connectedUser?.fullName : 'Guest User'
  const name = fullName.split(' ')[0]
  const lastName = fullName.split(' ')[1]

  const width = page === 'dashboard' ? 'w-full' : 'max-w-xLarge'

  return (
    <header
      data-component="Header"
      className={cx.join(
        width,
        'sticky m-auto bg-white flex items-center justify-between p-6 text-white border-slate-300 dark:bg-black dark:border-slate-600 max-w-3xl',
        'z-50'
      )}
    >
      <Logo slogan={t('slogan')} key={darkMode.toString()} />

      <div className="flex justify-between">
        {showSecondaryNav && !isLogged && (
          <div>
            <Nav isSecondaryNav items={[loginLink, tryForFreeButton]} />
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
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Dashboard
              </Link>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                {t('logout')}
              </a>
            </Dropdown>
          </div>
        )}

        <div className="ml-2 lg:mt-2">
          <ThemeSwitcher locale={locale} />
        </div>

        {showHamburgerMenu && (
          <div className="ml-2 lg:hidden">
            <HamburgerMenu locale={locale} isLogged={isLogged} connectedUser={connectedUser} />
          </div>
        )}

        <RenderIf isTrue={connectedUser && page === 'dashboard'}>
          <div className="-mt-1 ml-4">
            <Avatar url={connectedUser.businessLogo || ''} name="1 G" size="medium" />
          </div>
        </RenderIf>
      </div>
    </header>
  )
}

export default Header
