'use client'
import { FC } from 'react'
import Table from '~/components/Table'

type Props = {
  headers: string[]
  rows: string[][]
}

const GuestTable: FC<Props> = ({ headers, rows }) => {
  return <Table headers={headers} rows={[]} hoverHighlight rowsPerPage={2} />
}

export default GuestTable
