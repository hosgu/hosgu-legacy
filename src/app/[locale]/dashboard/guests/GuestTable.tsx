'use client'
import { FC, useState } from 'react'
import Table from '~/components/Table'
import Button from '~/components/Button'
import core from '@architecturex/utils.core'
import { deleteGuestServerAction } from '~/app/actions/dashboard/guest'

type Props = {
  data: any[]
}

const GuestTable: FC<Props> = ({ data }) => {
  const initialRows = data.map(({ id, fullName, email, phone, website, gender, birthday }: any) => [
    fullName,
    email,
    phone,
    website,
    gender,
    birthday,
    <a key={`delete-${fullName}`} href="#" onClick={() => handleDelete(id)}>
      X
    </a>
  ])

  const [rows, setRows] = useState(initialRows)

  const handleDelete = (id: string) => {
    const formData = core.formData.set(new FormData(), {
      id
    })

    deleteGuestServerAction(formData)
  }

  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday', 'Actions']

  return (
    <Table
      label="Guests"
      createButton={
        <Button color="info" size="small" href="guests/create">
          + Create
        </Button>
      }
      headers={headers}
      rows={rows}
      hoverHighlight
      rowsPerPage={10}
    />
  )
}

export default GuestTable
