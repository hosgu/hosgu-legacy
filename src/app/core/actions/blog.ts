'use server'
import api from '@architecturex/utils.api'

export const getAll = async () => {
  const posts = await api.fetch('/data/blog/posts.json', {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return posts
}

export const getPostCategories = async () => {
  const categories = await api.fetch('/data/blog/categories.json', {
    method: 'GET',
    addLocalHost: process.env.NODE_ENV === 'development'
  })

  return categories
}
