export type Amenity = {
  ac: boolean
  bedSheets: boolean
  coffeeMachine: boolean
  extraBed: boolean
  garden: boolean
  hotWater: boolean
  kitchen: boolean
  oven: boolean
  refrigerator: boolean
  towels: boolean
  tv: boolean
}

export type Service = {
  freeParking: boolean
  laundry: boolean
  pool: boolean
  wifi: boolean
}

export type Rule = {
  smoking: boolean
  petFriendly: boolean
}

export type ASR = {
  amenity: Amenity
  service: Service
  rule: Rule
}

class Property {
  asr: ASR | any = {}

  constructor(data: Partial<ASR>) {
    Object.assign(this.asr, { ...data })
  }

  toJSON() {
    const amenities = Object.entries(this.asr.amenity)
    const services = Object.entries(this.asr.service)
    const rules = Object.entries(this.asr.rule)
    let amenitiesFalse = {}
    let servicesFalse = {}
    let rulesFalse = {}
    const amenityKeys = Object.keys(amenities)
    const servicesKeys = Object.keys(services)
    const rulesKeys = Object.keys(rules)
    amenityKeys.forEach((element: any) => {
      if (!amenities[element][1]) {
        amenitiesFalse = { [`${amenities[element][0]}`]: false, ...amenitiesFalse }
      }
    })
    servicesKeys.forEach((element: any) => {
      if (!services[element][1]) {
        servicesFalse = { [`${services[element][0]}`]: false, ...servicesFalse }
      }
    })
    rulesKeys.forEach((element: any) => {
      if (!rules[element][1]) {
        rulesFalse = { [`${rules[element][0]}`]: false, ...rulesFalse }
      }
    })
    return {
      asr: {
        amenity: amenitiesFalse,
        service: servicesFalse,
        rule: rulesFalse
      }
    }
  }
}

export default Property
