'use client'
import { FC, useState, useEffect, useCallback } from 'react'
import core from '@architecturex/utils.core'

import CreateGuestForm from '~/app/dashboard/components/Guests/Form'

import Table from '~/components/Table'
import Button from '~/components/Button'
import Modal from '~/components/Modal'

type Props = {
  headerMapping: any
  data: any[]
  deleteServerAction: any
  connectedUser: any
  refetch: any
}

const CustomTable: FC<Props> = ({
  headerMapping,
  data: rawData = [],
  deleteServerAction,
  refetch,
  connectedUser
}) => {
  // Initial states
  const [data, setData] = useState(rawData)

  // Methods
  const handleDelete = useCallback(
    async (id: string) => {
      const formData = core.formData.set(new FormData(), {
        id
      })

      const response = await deleteServerAction(formData)

      if (response.ok) {
        const filteredData = data.filter((item: any) => item.id !== id)

        setData(filteredData)
      }
    },
    [data]
  )

  let tableHeaders = headerMapping
    .filter((item) => {
      if (item.label) return item.label
    })
    .map((item) => item.label)

  const tableRows = data.map((item) => {
    let row = []
    headerMapping.forEach((headerColumn) => {
      if (item.hasOwnProperty(headerColumn.key) && headerColumn.key != 'id') {
        if (headerColumn.action) {
          if (headerColumn.action.type == 'link') {
            row.push(
              <a key={`create-${item.id}`} href={`${headerColumn.action.href}/${item.id}`}>
                {item[headerColumn.key]}
              </a>
            )
          }
        } else {
          row.push(item[headerColumn.key])
        }
      }
    })
    return row
  })

  const getRows = useCallback(
    () =>
      tableRows?.map(({ id, fullName, email, phone, website, gender, birthday }: any) => [
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
      ]) || [],
    [data, handleDelete]
  )

  // States
  const initialRows = getRows()
  const [rows, setRows] = useState(initialRows)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const newRows = getRows()

    setRows(newRows)
  }, [data, getRows])

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
        key={`table-${tableRows.length}`}
        label="Guests"
        createButton={
          <Button color="info" size="small" onClick={() => setIsModalOpen(true)}>
            + Create
          </Button>
        }
        headers={tableHeaders}
        rows={tableRows}
        hoverHighlight
        rowsPerPage={10}
      />
    </>
  )
}

export default CustomTable
