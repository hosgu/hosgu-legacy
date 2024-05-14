import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { getAll } from '../shared/actions/blog'
import * as UserActions from '~/app/shared/actions/user'

import React from 'react'
import Header from '~/app/shared/components/Header'
import Footer from '~/app/shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser = await UserActions.getConnectedUser(cookieStore.get('at')?.value || '')
  const locale = cookieStore.get('locale')?.value || 'en-us'
  const {
    response: { items: posts }
  } = await getAll()
  console.log('Post:', posts)

  return (
    <>
      <Header locale={locale} connectedUser={connectedUser} />
      {/* POSTS JSX */}
      <div className="bg-gray-100 grid gap-5 md:grid-cols-2">
        {posts.map((item: any) => {
          return (
            <div key={item.title}>
              <h2 className="pb-0">{item.title}</h2>
              <p className="pb-2">{item.summary}</p>

              <div className="flex flex-row-reverse justify-end gap-4">
                <div>
                  <a href={item.author.link}>{item.author.name}</a>
                  <p>{item.author.role}</p>
                </div>
                <div className="h-[50px] w-[50px]">
                  <img
                    className="w-full h-full rounded-full"
                    src={item.author.image}
                    alt={item.author.name}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer locale={locale} />
    </>
  )
}

export default Page
