import is from '@architecturex/utils.is'
import { db } from '../../../db'

export type UsersFields = {
  id: string
  tier: string
  username: string
  email: string
  role: string
  fullName: string
  phone: string
  avatar: string
  birthday: string
  website: string
  active: string
  [key: string]: string
}

export const usersFields: UsersFields = {
  id: 'id',
  tier: 'tier',
  username: 'username',
  email: 'email',
  role: 'role',
  fullName: 'fullName',
  phone: 'phone',
  avatar: 'avatar',
  birthday: 'birthday',
  website: 'website',
  active: 'active'
}

export const secretKey = process.env.JWT_SECRET_KEY || ''
export const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
export const tableName = 'users'
export { db }
