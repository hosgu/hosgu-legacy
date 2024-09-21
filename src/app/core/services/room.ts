import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('room')
  }
}

const roomService = new Service()

export default roomService
