export type Amenity = {
  ac: boolean
  bedSheet: boolean
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
  asr: ASR = {
    amenity: {
      ac: true,
      bedSheet: true,
      coffeeMachine: true,
      extraBed: true,
      garden: true,
      hotWater: true,
      kitchen: true,
      oven: true,
      refrigerator: true,
      towels: true,
      tv: true
    },
    service: {
      freeParking: true,
      laundry: true,
      pool: true,
      wifi: true
    },
    rule: {
      smoking: true,
      petFriendly: true
    }
  }

  constructor(data: Partial<ASR>) {
    Object.assign(this, { ...data })
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
      if (!amenities[element]) {
        amenitiesFalse = { [element]: false, ...amenitiesFalse }
      }
    })
    servicesKeys.forEach((element: any) => {
      if (!amenities[element]) {
        servicesFalse = { [element]: false, ...servicesFalse }
      }
    })
    rulesKeys.forEach((element: any) => {
      if (!amenities[element]) {
        rulesFalse = { [element]: false, ...rulesFalse }
      }
    })
    return {
      amenity: amenitiesFalse,
      service: servicesFalse,
      rules: rulesFalse
    }
  }
}

export default Property
