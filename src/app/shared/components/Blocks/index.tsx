import { FC } from 'react'

import Features from './Features'
import TryNow from './TryNow'

type Props = {
  locale: string
}

const Blocks: FC<Props> = ({ locale }) => (
  <div data-component="Blocks" className="max-w-xLarge m-auto -mt-20 lg:mt-0">
    <Features locale={locale} />
    <TryNow locale={locale} />
  </div>
)

export default Blocks
