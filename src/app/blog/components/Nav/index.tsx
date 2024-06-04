'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useRef } from 'react'

import menuIcon from '../../../../../public/icons/blog/menu.svg'
import searchIcon from '../../../../../public/icons/blog/search.svg'
import xIcon from '../../../../../public/icons/blog/x.svg'

const Nav = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuListRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  console.log('🔗 Pathname:', pathname)

  return (
    <div className="flex items-center h-20 px-4 bg-gray-100 border-b-2 border-slate-500 ">
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="flex items-center gap-2 hover:bg-slate-200 hover:rounded-md px-3 h-8 md:hidden"
      >
        <Image src={menuIcon} alt="menu icon" height={16}></Image>
        <p>Categories</p>
      </button>

      <div className="flex items-center justify-center hover:bg-slate-200 hover:rounded-md w-8 h-8 ml-auto md:hidden">
        <Image src={searchIcon} alt="search icon" height={14} className="cursor-pointer" />
      </div>

      <input type="search" placeholder="Search posts..." className="ml-auto hidden" />

      <div
        ref={menuListRef}
        className="hidden absolute bottom-0 left-0 bg-slate-400 rounded-t-md w-full p-4 md:static md:block md:bg-transparent"
      >
        <div className="flex items-center mb-4 md:hidden">
          <p className="font-bold">Categories</p>
          <div className="flex items-center justify-center w-8 h-8 hover:bg-slate-200 hover:rounded-md ml-auto">
            <Image
              src={xIcon}
              alt="close menu icon"
              height={14}
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          </div>
        </div>
        <ul className="flex gap-4 flex-col md:flex-row">
          <li className="relative flex items-center h-8 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog"
              className={`w-full hover:no-underline ${pathname == '/blog' ? getActiveLinkStyle() : ''}`}
            >
              All posts
            </Link>
          </li>
          <li className="relative flex items-center h-8 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/category/Engineering"
              className={`hover:no-underline ${pathname == '/blog/category/Engineering' ? getActiveLinkStyle() : ''}`}
            >
              Engineering
            </Link>
          </li>
          <li className="relative flex items-center h-8 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/category/Community"
              className={`hover:no-underline ${pathname == '/blog/category/Community' ? getActiveLinkStyle() : ''}`}
            >
              Community
            </Link>
          </li>
          <li className="relative flex items-center h-8 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/category/Company-news"
              className={`hover:no-underline ${pathname == '/blog/category/Company-news' ? getActiveLinkStyle() : ''}`}
            >
              Company news
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )

  function getActiveLinkStyle() {
    return 'before:w-full before:h-[2px] before:bg-black before:absolute before:top-full'
  }

  function toggleMenu() {
    const menu = menuButtonRef.current
    const menuList = menuListRef.current
    if (!menu || !menuList) return

    menuList.classList.toggle('hidden')
  }
}

export default Nav
