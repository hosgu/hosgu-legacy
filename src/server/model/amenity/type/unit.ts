import Property from '../property'
import { Amenity } from '../property'

class Unit extends Property {
  constructor(data: Partial<Amenity>) {
    super(data)
  }
}

export default Unit
