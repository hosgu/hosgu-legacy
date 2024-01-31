'use client'
import { FC, useState, useEffect, useCallback } from 'react'
import Table from '~/components/Table'
import Button from '~/components/Button'
import core from '@architecturex/utils.core'
import { deleteGuestServerAction } from '~/app/actions/dashboard/guest'

type Props = {
  data: any[]
}

const GuestTable: FC<Props> = ({ data: rawData = [] }) => {
  // Initial states
  const [data, setData] = useState(rawData)

  // Methods
  const handleDelete = useCallback(
    async (id: string) => {
      const formData = core.formData.set(new FormData(), {
        id
      })

      const response = await deleteGuestServerAction(formData)

      if (response.ok) {
        const filteredData = data.filter((guest: any) => guest.id !== id)

        setData(filteredData)
      }
    },
    [data]
  )

  const getRows = useCallback(
    () =>
      data?.map(({ id, fullName, email, phone, website, gender, birthday }: any) => [
        fullName,
        email,
        phone,
        website,
        gender,
        birthday,
        <a key={`delete-${fullName}`} href="#" onClick={() => handleDelete(id)}>
          X
        </a>
      ]) || [],
    [data, handleDelete]
  )

  // States
  const initialRows = getRows()
  const [rows, setRows] = useState(initialRows)

  useEffect(() => {
    const newRows = getRows()

    setRows(newRows)
  }, [data, getRows])

  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday', 'Actions']

  return (
    <Table
      key={`table-${rows.length}`}
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
