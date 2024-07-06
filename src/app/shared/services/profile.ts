import api from '@architecturex/utils.api'
import slug from '@architecturex/utils.slug'
import { APIResponse, CreatedItem } from '~/types'
import { PropertyFields } from '~/server/db/schemas/property'

import ServiceHandler from './Service'
import e from 'express'

class Service extends ServiceHandler {
  constructor() {
    super('profile')
  }
}

const profileService = new Service()

export default profileService
