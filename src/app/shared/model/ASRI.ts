export interface AmenityServiceI {
  amenities: {
    ac?: boolean
    bedSheets?: boolean
    coffee_machine?: boolean
    extraBed?: boolean
    garden?: boolean
    hotWater?: boolean
    glassesPlates?: boolean
    kitchen?: boolean
    oven?: boolean
    refrigerator?: boolean
    towels?: boolean
    tv?: boolean
  }
  services: {
    freeParking?: boolean
    laundry?: boolean
    pool?: boolean
    wifi?: boolean
  }
}

export interface RuleI {
  smoking?: boolean
  petFriendly?: boolean
  weedFriendly?: boolean
}
