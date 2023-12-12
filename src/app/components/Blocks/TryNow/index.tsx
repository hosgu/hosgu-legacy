import { FC } from 'react'
import { Button } from '@architecturex/components.button'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

const TryNow: FC<Props> = ({ t }) => (
  <div
    data-component="TryNow"
    className="bg-white px-8 py-16 text-center dark:bg-black dark:text-white"
  >
    <p className="mb-4 text-2xl">{t.readyToTransformYourExperience}</p>

    <Button color="secondary" bold>
      {t.tryNow}
    </Button>
  </div>
)

export default TryNow
