'use client'
import React, { FC, useState } from 'react'

import HorizontalMenu from '~/components/HorizontalMenu'
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

  const tabs = {
    General: () => setActive('General'),
    Business: () => setActive('Business'),
    Property: () => setActive('Property'),
    Amenities: () => setActive('Amenities'),
    Prices: () => setActive('Prices'),
    Photos: () => setActive('Photos')
  }

  return (
    <div>
      <HorizontalMenu tabs={tabs} activeTab={active} />

      <div className="flex">
        <SettingsComponent />
      </div>
    </div>
  )
}

export default Settings
