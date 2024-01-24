'use client'
import { FC } from 'react'
import Table from '~/components/Table'
import Button from '~/components/Button'

type Props = {
  headers: string[]
  rows: string[][]
}

const GuestTable: FC<Props> = ({ headers, rows }) => {
  return (
    <Table
      label="Guests"
      createButton={
        <Button color="info" size="small">
          + Create
        </Button>
      }
      headers={headers}
      rows={rows}
      hoverHighlight
      rowsPerPage={2}
    />
  )
}

export default GuestTable
