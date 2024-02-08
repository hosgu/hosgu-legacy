'use client'
import { FC } from 'react'
import Form from '../../components/Guests/Form'

type Props = {
  connectedUser: any
  serverActions: {
    revalidateCacheByTag: any
  }
}

const CreateGuestForm: FC<Props> = ({ connectedUser, serverActions }) => {
  return (
    <Form
      action="save"
      data={{ businessId: connectedUser.businessId }}
      serverActions={serverActions}
    />
  )
}

export default CreateGuestForm
