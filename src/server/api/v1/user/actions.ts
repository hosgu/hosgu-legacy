import jwt from 'jsonwebtoken'
import is from '@architecturex/utils.is'
import api from '@architecturex/utils.api'
import { eq } from 'drizzle-orm'
import security from '@architecturex/utils.security'

import { user as userTable } from '../../../db/schemas/user'
import { business as businessTable } from '../../../db/schemas/business'
import Config from '../../../config'
import { secretKey, expiresIn, UsersFields, usersFields, tableName, db } from './props'

export type Login = {
  emailOrUsername: string
  password: string
}

export const createToken = async (user: any): Promise<string[] | string> => {
  const {
    id,
    tier,
    fullName,
    password,
    email,
    active,
    role,
    businessId,
    businessLogo,
    businessName,
    businessSlug
  } = user

  const token = security.base64.encode(`${security.password.encrypt(secretKey)}${password}`, true)
  const userData = {
    id,
    tier,
    role,
    fullName,
    email,
    active,
    token,
    businessId,
    businessLogo,
    businessName,
    businessSlug
  }

  const createTk = jwt.sign({ data: security.base64.encode(userData, true) }, secretKey, {
    expiresIn
  })

  return Promise.all([createTk])
}

export function jwtVerify(accessToken = '', cb: any): any {
  const token = security.string.deobfuscate(accessToken)

  jwt.verify(token, secretKey, (error: any, accessTokenData: any = {}) => {
    const { data: user } = accessTokenData

    if (error || !user) {
      return cb(false)
    }

    const userData = security.base64.decode(user, true)

    return cb(userData)
  })
}

export const getUserData = async (accessToken: any): Promise<any> => {
  const UserPromise = new Promise((resolve) => jwtVerify(accessToken, (user: any) => resolve(user)))

  const user = await UserPromise

  return user
}

export const getUserBy = async (where: any, roles: string[], fields: string): Promise<any> => {
  const selectedFields: Partial<UsersFields> = api.fields(fields, usersFields)

  if (fields.includes('password')) {
    selectedFields.password = 'password'
  }

  const response = await db
    .select()
    .from(userTable)
    .where(eq(where.code ? userTable.code : userTable.email, where.code || where.email))

  if (response[0] && roles.includes(response[0].role || '')) {
    const businessResponse = await db
      .select()
      .from(businessTable)
      .where(eq(businessTable.userId, response[0].id))

    const user = {
      ...response[0],
      businessId: businessResponse[0].id,
      businessLogo: businessResponse[0].logo || '',
      businessName: businessResponse[0].name || '',
      businessSlug: businessResponse[0].slug || ''
    }

    return user
  } else {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }
}

export const authenticate = async (emailOrUsername: string, password: string): Promise<any> => {
  const where = is(emailOrUsername).email()
    ? { email: emailOrUsername }
    : { username: emailOrUsername }

  const user = await getUserBy(
    where,
    Config.user.roles,
    'id,tier,username,password,email,role,fullName,birthday,avatar,website,phone,active'
  )

  if (!user) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }

  const passwordMatch = security.password.match(password, user.password, true)

  const isActive = user.active

  if (!passwordMatch.isValid) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }

  if (!isActive) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'ACCOUNT_NOT_ACTIVATED',
      message: 'accountNotActivated'
    }
  }

  const [token] = await createToken(user)

  return security.string.obfuscate(token)
}
