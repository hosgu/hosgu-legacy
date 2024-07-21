import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('asr')
  }
}

const asr = new Service()

export default asr
