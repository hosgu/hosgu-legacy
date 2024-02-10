import { FC, ReactElement } from 'react'

import Header from '~/app/shared/components/Header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  return (
    <main>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header locale="en-us" />
      </div>

      <div>{children}</div>
    </main>
  )
}

export default Layout
