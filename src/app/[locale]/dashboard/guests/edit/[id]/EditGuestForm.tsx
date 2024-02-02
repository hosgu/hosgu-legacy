'use client'
import { FC } from 'react'
import Form from '../../../components/Guests/Form'

const EditGuestForm: FC<any> = ({ data }) => {
  return <Form action="edit" data={data} />
}

export default EditGuestForm
