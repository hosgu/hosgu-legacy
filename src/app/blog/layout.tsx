import { cookies } from 'next/headers'
import * as UserActions from '~/app/shared/actions/user'

import React from 'react'
import { getPostCategories } from '../shared/actions/blog'
import Header from '~/app/shared/components/Header'
import Nav from './components/Nav'
import Footer from '~/app/shared/components/Footer'

const BlogLayout = async ({ children }: Props) => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'

  const categoriesResponse = await getPostCategories()
  const categories = categoriesResponse.response.items

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      <Nav categories={categories} />
      {children}
      <Footer locale={locale} />
    </>
  )
}

interface Props {
  children: React.ReactNode
}

export default BlogLayout
