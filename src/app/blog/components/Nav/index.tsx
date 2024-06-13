'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useRef } from 'react'
import SVG from '@architecturex/components.svg'

// TODO: Move to architectureX
import searchIcon from '../../../../../public/icons/blog/search.svg'

type Props = {
  categories: string[]
}

const Nav = ({ categories }: Props) => {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuListRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const links = categories.map((category: any) => {
    const href = category.slug === 'all' ? '/blog' : `/blog/category/${category.slug}`
    return (
      <li
        key={category}
        className="relative flex items-center h-8 rounded-md hover:bg-slate-300 md:hover:bg-transparent md:hover:text-slate-400"
      >
        <Link
          href={href}
          className={`w-full hover:no-underline ${pathname == '/blog' ? getActiveLinkStyle() : ''}`}
        >
          {category.name}
        </Link>
      </li>
    )
  })

  return (
    <div className="flex items-center h-20 px-4 bg-gray-100 border-b-2 border-slate-500 ">
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="flex items-center gap-2 hover:bg-slate-200 hover:rounded-md px-3 h-8 md:hidden"
      >
        <SVG.Hamburger />
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
            <SVG.X onClick={toggleMenu} />
          </div>
        </div>
        <ul className="flex gap-4 flex-col md:flex-row">{links}</ul>
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
