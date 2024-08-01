import Property from '../property'
import { Amenity } from '../property'

class PenhouseRoom extends Property {
  constructor(data: Partial<Amenity>) {
    super(data)
  }
}

export default PenhouseRoom
