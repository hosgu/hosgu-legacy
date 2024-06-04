'use client'

import { useEffect, useState } from 'react'
import { getAll } from '../../shared/actions/blog'
import PostCard from '../components/PostCard/index'

const LatestSection = ({ category }: Props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = []
      console.log('category 👉🏼', category)
      if (category === '') {
        console.log('fetch all')
        const response = await getAll()
        posts = response.response.items
      } else {
        // TODO: Fetch by category
        console.log('fetch by category')
        const response = await getAll()
        posts = response.response.items
        posts = posts.filter((post: any) => {
          // TODO: Fix the company news category
          if (category === 'Company-news') return true
          return post.category === category
        })
      }

      setPosts(posts)
    }
    fetchPosts()
  }, [category])

  return (
    <>
      <div className="flex flex-col justify-start items-stretch gap-10 md:py-16 bg-gray-100 p-4 md:px-28 ">
        <div>
          <h2 className="text-[40px] text-bold tracking-tight leading-10">Latest</h2>
        </div>
        <div className="grid gap-y-10 md:gap-y-16 md:gap-x-16 md:grid-cols-2">
          {posts.map((item: any) => {
            return (
              <PostCard
                key={item.id}
                title={item.title}
                postDate={item.postDate}
                summary={item.summary}
                category={item.category}
                author={item.author}
              />
            )
          })}
        </div>
        <div className="flex justify-center pt-6">
          <button
            type="button"
            className="flex items-center rounded-md shadow-md border font-normal justify-center leading-5 text-center border-zinc-800 px-32 py-1 bg-gray-200 hover:bg-gray-300"
          >
            <span className="text-base items-center font-medium tracking-tight leading-10">
              Load More
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

interface Props {
  category: string
}

export default LatestSection
