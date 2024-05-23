'use client'
import Link from 'next/link'
import Image from 'next/image'
import menuIcon from '../../../../../public/icons/blog/menu.svg'
import searchIcon from '../../../../../public/icons/blog/search.svg'
import xIcon from '../../../../../public/icons/blog/x.svg'
import { useRef } from 'react'

const Nav = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuListRef = useRef<HTMLDivElement>(null)

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
        <ul className="flex gap-1 flex-col md:flex-row">
          <li className="flex items-center h-8 px-2 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/[category]"
              as="/blog"
              onClick={underlineActiveLink}
              className="hover:no-underline"
            >
              All posts
            </Link>
          </li>
          <li className="flex items-center h-8 px-2 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/[category]"
              as="/blog/A"
              onClick={underlineActiveLink}
              className="hover:no-underline"
            >
              Engineering
            </Link>
          </li>
          <li className="flex items-center h-8 px-2 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/[category]"
              as="/blog/B"
              onClick={underlineActiveLink}
              className="hover:no-underline"
            >
              Community
            </Link>
          </li>
          <li className="flex items-center h-8 px-2 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400">
            <Link
              href="/blog/[category]"
              as="/blog/C"
              onClick={underlineActiveLink}
              className="hover:no-underline"
            >
              Company news
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )

  function underlineActiveLink(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = event.target as HTMLAnchorElement
    const links = menuListRef.current?.querySelectorAll('a')

    if (!links) return

    links.forEach((link) => link.classList.remove('underline'))
    target.classList.add('underline')
  }

  function toggleMenu() {
    const menu = menuButtonRef.current
    const menuList = menuListRef.current
    if (!menu || !menuList) return

    menuList.classList.toggle('hidden')
  }
}

export default Nav
