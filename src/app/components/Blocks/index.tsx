import { FC } from 'react'

import { Translations } from '~app/i18n'

import TryNow from './TryNow'
import Features from './Features'
import Pricing from './Pricing'
import Clients from './Clients'
import Gallery from './Gallery'

type Props = {
  t: Translations
}

const Blocks: FC<Props> = ({ t }) => (
  <div data-component="Blocks" className="max-w-xLarge m-auto">
    <TryNow t={t} />
    <Features t={t} />
    <Pricing t={t} />
    <Clients t={t} />
  </div>
)

export default Blocks
