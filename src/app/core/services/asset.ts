import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('asset')
  }
}

const assetService = new Service()

export default assetService
