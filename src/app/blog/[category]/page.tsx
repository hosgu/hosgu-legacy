'use client'
import LatestSection from '../sections/LatestSection'

const CategoryPage = ({ params }) => {
  const { category } = params
  return <LatestSection category={category} />
}

export default CategoryPage
