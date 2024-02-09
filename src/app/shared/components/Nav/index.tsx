import { FC, ReactElement, ReactNode } from 'react'

type Props = {
  isSecondaryNav?: boolean
  items: string[] | ReactElement[] | ReactNode[]
}

const Nav: FC<Props> = ({ isSecondaryNav, items }) => {
  const key = isSecondaryNav ? 'secondary-nav' : 'primary-nav'

  return (
    <ul data-component="Nav" className="flex items-center list-none p-0 m-0 max-lg:hidden">
      {items.map((item, i) => (
        <li key={`${key}-${i}`} className="ml-4 text-base text-gray-900 dark:text-gray-100">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Nav
