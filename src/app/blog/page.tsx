import { NextPage } from 'next'
import LatestSection from './sections/LatestPostsSection'
import { getAll } from '../shared/actions/blog'

const Page: NextPage = async () => {
  const response = await getAll()
  const posts = response.response.items

  return (
    <>
      <LatestSection posts={posts} />
    </>
  )
}

export default Page
