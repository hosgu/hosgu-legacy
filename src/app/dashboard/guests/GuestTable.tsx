'use client'
import { FC, useState, useEffect, useCallback } from 'react'
import core from '@architecturex/utils.core'

import CreateGuestForm from '~/app/dashboard/components/Guests/Form'
import { deleteGuestServerAction } from '~/app/shared/actions/dashboard/guest'

import Table from '~/components/Table'
import Button from '~/components/Button'
import Modal from '~/components/Modal'

type Props = {
  data: any[]
  connectedUser: any
  refetch: any
}

const GuestTable: FC<Props> = ({ data: rawData = [], refetch, connectedUser }) => {
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

  const getRows = useCallback(() => {
    var initialRows =
      data?.map(({ id, fullName, email, phone, website, gender, birthday }: any) => [
        <a key={`create-${id}`} href={`guests/profile/${id}`}>
          {fullName}
        </a>,
        email,
        phone,
        website,
        gender,
        birthday,
        <>
          <a key={`delete-${fullName}`} href="#" onClick={() => handleDelete(id)}>
            X
          </a>
          <a key={`edit-${fullName}`} href={`guests/edit/${id}`}>
            Edit
          </a>
        </>
      ]) || []
    var searchRows =
      data?.map(({ fullName, email, phone, website, gender, birthday }: any) => [
        fullName,
        email,
        phone,
        website,
        gender,
        birthday
      ]) || []
    return [initialRows, searchRows]
  }, [data, handleDelete])

  // States
  const [initialRows, searchRows] = getRows()
  const [rows, setRows] = useState(initialRows)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const [initialRows, _] = getRows()

    setRows(initialRows)
  }, [data, getRows])

  const headers = ['Full name', 'Email', 'Phone', 'Links', 'Gender', 'Birthday', 'Actions']

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={async () => {
          setIsModalOpen(false)

          const {
            data: { items: newGuests }
          } = await refetch()

          setData(newGuests)
        }}
        title="Add new Guest"
      >
        <CreateGuestForm action="save" data={{ businessId: connectedUser.businessId }} />
      </Modal>

      <Table
        key={`table-${rows.length}`}
        label="Guests"
        createButton={
          <Button color="info" size="small" onClick={() => setIsModalOpen(true)}>
            + Create
          </Button>
        }
        headers={headers}
        rows={rows}
        searchRows={searchRows}
        hoverHighlight
        rowsPerPage={10}
      />
    </>
  )
}

export default GuestTable
