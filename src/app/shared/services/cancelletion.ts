import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('cancelletion')
  }
}

const cancelletionService = new Service()

export default cancelletionService
