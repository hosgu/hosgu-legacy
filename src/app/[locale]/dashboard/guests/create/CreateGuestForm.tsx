'use client'
import { FC } from 'react'
import Form from '../../components/Guests/Form'

type Props = {
  connectedUser: any
}

const CreateGuestForm: FC<Props> = ({ connectedUser }) => {
  return <Form action="save" data={{ businessId: connectedUser.businessId }} />
}

export default CreateGuestForm
