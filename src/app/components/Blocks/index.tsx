import { FC } from 'react'

import { Translations } from '~app/i18n'

import Features from './Features'
import TryNow from './TryNow'

type Props = {
  t: Translations
}

const Blocks: FC<Props> = ({ t }) => (
  <div data-component="Blocks" className="max-w-xLarge m-auto">
    <Features t={t} />
    <TryNow t={t} />
  </div>
)

export default Blocks
