'use client'
import React, { FC, useState } from 'react'
import cx from '@architecturex/utils.cx'
import SVG from '@architecturex/components.svg'

const sidebars: any = {
  none: <div />,
  calendar: (
    <div className="h-screen w-52 overflow-y-auto bg-white py-8 dark:bg-black sm:w-60">
      <div className="flex items-start">
        <h2 className="inline px-5 text-xl text-slate-800 dark:text-slate-200">Reservations</h2>
      </div>

      <div className="mx-2 mt-8 space-y-4">
        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Cabaña de Piedra
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Cabaña Victoria
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Hotel San Pancho
          </h2>
        </button>
      </div>
    </div>
  ),
  guests: (
    <div className="h-screen w-52 overflow-y-auto bg-white py-8 dark:bg-black sm:w-60">
      <div className="flex items-start">
        <h2 className="inline px-5 text-xl text-slate-800 dark:text-slate-200">Guests</h2>
      </div>

      <div className="mx-2 mt-8 space-y-4">
        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <a
            href="/en-us/dashboard/guests/create"
            className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 hover:no-underline px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800"
          >
            <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200 ">
              Add new guest
            </h2>
          </a>
        </button>

        <a
          href="/en-us/dashboard/guests"
          className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 hover:no-underline px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800"
        >
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            All guests
          </h2>
        </a>
      </div>
    </div>
  ),
  reports: (
    <div className="h-screen w-52 overflow-y-auto bg-white py-8 dark:bg-black sm:w-60">
      <div className="flex items-start">
        <h2 className="inline px-5 text-xl text-slate-800 dark:text-slate-200">Reports</h2>
      </div>

      <div className="mx-2 mt-8 space-y-4">
        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            General Reports
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Sales
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Expenses
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Reservations
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Clients
          </h2>
        </button>
      </div>
    </div>
  ),
  users: (
    <div className="h-screen w-52 overflow-y-auto bg-white py-8 dark:bg-black sm:w-60">
      <div className="flex items-start">
        <h2 className="inline px-5 text-xl text-slate-800 dark:text-slate-200">Users</h2>
      </div>

      <div className="mx-2 mt-8 space-y-4">
        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Add new user
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            All users
          </h2>
        </button>
      </div>
    </div>
  ),
  settings: (
    <div className="h-screen w-52 overflow-y-auto bg-white py-8 dark:bg-black sm:w-60">
      <div className="flex items-start">
        <h2 className="inline px-5 text-xl text-slate-800 dark:text-slate-200">Settings</h2>
      </div>

      <div className="mx-2 mt-8 space-y-4">
        <button className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            General settings
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Business settings
          </h2>
        </button>

        <button className="flex w-full flex-col gap-y-2 rounded-lg hover:bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:hover:bg-slate-800">
          <h2 className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
            Dahsboard settings
          </h2>
        </button>
      </div>
    </div>
  )
}

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState('none')

  const handleSidebar = (name: string) => {
    if (sidebar === name) {
      setSidebar('none')
      return
    }

    setSidebar(name)
  }

  return (
    <aside className="flex">
      {/* First Column */}
      <div className="flex h-screen w-12 flex-col items-center space-y-8 bg-white py-8 dark:border-slate-700 dark:bg-black sm:w-16">
        {/* Calendar */}
        <a
          href="#"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800':
                sidebar === 'calendar'
            }
          )}
          onClick={() => handleSidebar('calendar')}
        >
          <SVG.Calendar label="Reservations" />
        </a>
        {/* Guests */}
        <a
          href="#"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800': sidebar === 'guests'
            }
          )}
          onClick={() => handleSidebar('guests')}
        >
          <SVG.Guests label="Guests" />
        </a>
        {/* Reports */}
        <a
          href="#"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800':
                sidebar === 'reports'
            }
          )}
          onClick={() => handleSidebar('reports')}
        >
          <SVG.Reports label="Reports" />
        </a>
        {/* Users */}
        <a
          href="#"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800': sidebar === 'users'
            }
          )}
          onClick={() => handleSidebar('users')}
        >
          <SVG.User label="Users" />
        </a>
        {/* Settings */}
        <a
          href="#"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800':
                sidebar === 'settings'
            }
          )}
          onClick={() => handleSidebar('settings')}
        >
          <SVG.Settings label="Settings" />
        </a>
        {/* Logout */}
        <a
          href="/logout"
          className={cx.join(
            'rounded-lg p-1.5 transition-colors duration-200 focus:outline-none hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800',
            {
              'text-blue-600 bg-blue-100 hover:bg-slate-200 dark:bg-slate-800': sidebar === 'logout'
            }
          )}
          onClick={() => handleSidebar('logout')}
        >
          <SVG.Logout label="Logout" />
        </a>
      </div>
      {/* Second Column */}
      {sidebars[sidebar]}
    </aside>
  )
}

export default Sidebar
