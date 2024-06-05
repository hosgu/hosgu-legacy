'use client'

import LatestSection from '../../sections/LatestPostsSection'

const CategoryPage = ({ params }: Props) => {
  return <LatestSection category={params.name} />
}

interface Props {
  params: {
    name: string
  }
}

export default CategoryPage
