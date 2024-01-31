'use client'
import { FC } from 'react'
import Table from '~/components/Table'
import Button from '~/components/Button'

type Props = {
  data: any[]
}

const GuestTable: FC<Props> = ({ data }) => {
  const handleDelete = (id: string) => {}

  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday', 'Actions']

  const rows = data.map(({ id, fullName, email, phone, website, gender, birthday }: any) => [
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
