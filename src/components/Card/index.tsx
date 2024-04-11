import React, { FC, ReactElement } from 'react'
import { RenderIf } from '@architecturex/components.renderif'

interface Props {
  svg?: ReactElement
  title: string
  content: ReactElement | string
  footer?: string
}

const Card: FC<Props> = ({ svg, title, content, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full mr-2">
      <h2 className="font-semibold text-lg mb-2 flex items-center p-0 pb-3 border-b">
        <RenderIf isTrue={!!svg}>
          <span className="mr-2 bg-lime-200 rounded-full p-2">{svg}</span>
        </RenderIf>

        <span>{title}</span>
      </h2>
      <div className="text-center">{content}</div>
      {footer && <div className="mt-4 text-sm text-gray-600">{footer}</div>}
    </div>
  )
}

export default Card
