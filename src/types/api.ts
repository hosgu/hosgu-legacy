export type APIResponse<T = any> = {
  ok: boolean
  cache?: boolean
  status: number
  items?: T[]
  error?: {
    code: string
    message: string
  }
  [key: string]: any
}

export type CreatedItem = {
  id: string
  [key: string]: any
}

export type Token = {
  token: string
}
