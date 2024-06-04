'use client'

import { useEffect, useState } from 'react'
import { getAll } from '../../shared/actions/blog'

const LatestSection = ({ category }: Props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = []
      console.log('category 👉🏼', category)
      if (category === '') {
        const response = await getAll()
        posts = response.response.items
        console.log('posts 👉🏼', posts)
      } else {
        // TODO: Fetch by category
        const response = await getAll()
        posts = response.response.items
        posts = posts.filter((post: any) => post.category === category)
      }

      setPosts(posts)
    }
    fetchPosts()
  }, [category])

  return (
    <>
      <div className="bg-gray-100 grid gap-5 md:grid-cols-2 px-4">
        {posts.map((item: any) => {
          return (
            <div key={item.title}>
              <h2 className="pb-0">{item.title}</h2>
              <p className="pb-2">{item.summary}</p>
              <p className="pb-2">{item.category}</p>

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
    </>
  )
}

interface Props {
  category: string
}

export default LatestSection
