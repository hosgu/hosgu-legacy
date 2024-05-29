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
  }, [])

  return (
    <>
      <div className="bg-gray-100 grid gap-y-10 md:gap-y-16 md:gap-x-16 md:grid-cols-2 p-4 md:px-28">
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
    </>
  )
}

interface Props {
  category: string
}

export default LatestSection
