'use client'
import React, { FC, useState } from 'react'
import GeneralSettings from '../GeneralSettings'
import BusinessSettings from '../BusinessSettings'
import PropertySettings from '../PropertySettings'
import AmenitiesSettings from '../AmenitiesSettings'
import PricesSettings from '../PricesSettings'
import PhotosSettings from '../PhotosSettings'

const SettingsComponents: any = {
  General: GeneralSettings,
  Business: BusinessSettings,
  Property: PropertySettings,
  Amenities: AmenitiesSettings,
  Prices: PricesSettings,
  Photos: PhotosSettings
}

const Settings: FC = () => {
  const [active, setActive] = useState('General')

  const SettingsComponent = SettingsComponents[active]

  return (
    <div>
      <h1>Settings:</h1>

      <ul>
        <li onClick={() => setActive('General')}>General</li>
        <li onClick={() => setActive('Business')}>Business</li>
        <li onClick={() => setActive('Property')}>Property</li>
        <li onClick={() => setActive('Amenities')}>Amenities</li>
        <li onClick={() => setActive('Prices')}>Prices & Times</li>
        <li onClick={() => setActive('Photos')}>Photos</li>
      </ul>

      <div className="flex">
        <SettingsComponent />
      </div>
    </div>
  )
}

export default Settings
