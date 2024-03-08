import api from '@architecturex/utils.api'
import { APIResponse } from '~/types'

type GetOne = {
  id?: string
  endpoint?: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT'
  credentials?: any
  body?: any
  returnItemsOnly?: boolean
  returnFirstItemOnly?: boolean
}

class Service {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  async getAll(endpoint = ''): Promise<any> {
    const response = await api.fetch<APIResponse<any>>(`/api/v1/${endpoint || this.endpoint}`, {
      method: 'GET',
      addLocalHost: process.env.NODE_ENV === 'development'
    })
    return response
  }

  async getOne({
    id,
    endpoint,
    method = 'GET',
    credentials,
    body = {},
    returnItemsOnly = false,
    returnFirstItemOnly = false
  }: GetOne): Promise<any> {
    const endpointPath = endpoint ? '' : `/${id}`
    const response = await api.fetch<APIResponse<any>>(
      `/api/v1/${endpoint || this.endpoint}${endpointPath}`,
      {
        method,
        addLocalHost: process.env.NODE_ENV === 'development',
        credentials,
        body
      }
    )

    if (returnItemsOnly) {
      return response.items
    }

    if (returnFirstItemOnly) {
      return response.items?.[0]
    }

    return response
  }

  async create(itemData: any): Promise<any> {
    const createdItem = await api.fetch<APIResponse<any>>(`/api/v1/${this.endpoint}/create`, {
      method: 'POST',
      body: itemData,
      addLocalHost: process.env.NODE_ENV === 'development'
    })

    if (createdItem.status === 201) {
      return {
        ok: true,
        data: itemData,
        status: 200
      }
    }

    return {
      ok: false,
      error: {
        code: 'ERROR_CREATING_ITEM',
        message: 'Error creating item'
      },
      status: 500
    }
  }

  async update(id: string, itemData: any): Promise<any> {
    const editedItem = await api.fetch<APIResponse<any>>(`/api/v1/${this.endpoint}/${id}`, {
      method: 'PUT',
      body: itemData,
      addLocalHost: process.env.NODE_ENV === 'development'
    })

    if (editedItem.status === 200) {
      return {
        ok: true,
        data: itemData,
        status: 200
      }
    }

    return {
      ok: false,
      error: {
        code: 'ERROR_EDITING_ITEM',
        message: 'Error editing item'
      },
      status: 500
    }
  }

  async delete(id: string): Promise<any> {
    const response = await api.fetch<APIResponse<any>>(`/api/v1/${this.endpoint}/${id}`, {
      method: 'DELETE',
      addLocalHost: process.env.NODE_ENV === 'development'
    })

    return {
      ok: true,
      data: response,
      status: 200
    }
  }
}

export default Service
