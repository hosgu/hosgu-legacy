import { getAll } from '~/app/shared/actions/blog'
import LatestSection from '../../sections/LatestPostsSection'

const CategoryPage = async ({ params }: Props) => {
  const response = await getAll()
  const posts = response.response.items
  const filteredPosts = posts.filter((post: any) => post.categorySlug === params.name)

  return <LatestSection posts={filteredPosts} />
}

interface Props {
  params: {
    name: string
  }
}

export default CategoryPage
