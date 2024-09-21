import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('guest')
  }
}

const guestService = new Service()

export default guestService
