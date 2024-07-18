import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('photo')
  }
}

const photoService = new Service()

export default photoService
