'use client'
import React, { FC, useState } from 'react'
import SVG from '@architecturex/components.svg'
import str from '@architecturex/utils.string'
import { RenderIf } from '@architecturex/components.renderif'

import ThemeSwitcher from '~/app/shared/components/Header/ThemeSwitcher'
import Logo from '~/app/shared/components/Logo'
import Input from '~/components/Input'
import Sidebar from '../Sidebar'

import Config from '~/config'

type HeaderProps = {
  locale: string
  logoText?: string
}

type HambugerMenuProps = {
  toggleSidebar: () => void
}

const HambugerMenu: FC<HambugerMenuProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-center ml-3 mr-3">
      <div
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
        onClick={toggleSidebar}
      >
        <SVG.Hamburger label="Open Menu" />
      </div>
    </div>
  )
}

const Header: FC<HeaderProps> = ({ locale, logoText = Config.siteTitle }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <header className="flex justify-between items-center bg-white dark:bg-gray-950 h-14 shadow-md">
        <div className="flex w-auto justify-between min-w-max">
          <HambugerMenu toggleSidebar={() => setShowSidebar(!showSidebar)} />

          <Logo
            includeText={false}
            alternativeText={str.ellipsis(logoText, 20)}
            initials={str.initials(logoText)}
          />
        </div>

        <div className="ml-10 xl:ml-60 w-full m-auto items-center hidden md:block">
          <Input
            name="search"
            shape="pill"
            placeholder="Search reservations, guests and more..."
            fullWidth
            style={{ marginTop: '0px' }}
          />
        </div>

        <div className="flex items-center justify-end w-2/4">
          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <SVG.Plus />
          </div>
          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <SVG.Calendar />
          </div>
          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <SVG.Bed />
          </div>
          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <SVG.Bell />
          </div>
          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <SVG.User />
          </div>

          <div className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
            <ThemeSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <RenderIf isTrue={showSidebar}>
        <aside className="fixed top-14 left-0 h-full w-96 bg-white dark:bg-gray-950 shadow-lg z-50">
          <div className="flex flex-col justify-between items-center p-4">
            <nav className="flex flex-col mt-4">
              <ul>
                <li className="mb-4 h-12 w-96">
                  <a
                    href="#"
                    className="flex w-full h-12 pl-4 items-center text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 dark:text-white hover:text-white hover:no-underline"
                  >
                    <SVG.Chart color="#666" />
                    &nbsp;&nbsp;
                    <span className="font-semibold">Reports</span>
                  </a>
                </li>
                <li className="mb-4 h-12 w-96">
                  <a
                    href="#"
                    className="flex w-full h-12 pl-4 items-center text-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 dark:text-white hover:text-white hover:no-underline"
                  >
                    <SVG.Calendar color="#666" />
                    &nbsp;&nbsp;
                    <span className="font-semibold">Calendario</span>
                  </a>
                </li>
                <li className="mb-4 h-12 w-96">
                  <a
                    href="/control/guests"
                    className="flex w-full h-12 pl-4 items-center text-gray-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 dark:text-white hover:text-white hover:no-underline"
                  >
                    <SVG.Guests color="#666" />
                    &nbsp;&nbsp;
                    <span className="font-semibold">Guests</span>
                  </a>
                </li>
                <li className="mb-4 h-12 w-96">
                  <a
                    href="/control/users"
                    className="flex w-full h-12 pl-4 items-center text-gray-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 dark:text-white hover:text-white hover:no-underline"
                  >
                    <SVG.User color="#666" />
                    &nbsp;&nbsp;
                    <span className="font-semibold">Users</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </RenderIf>
    </>
  )
}

export default Header
