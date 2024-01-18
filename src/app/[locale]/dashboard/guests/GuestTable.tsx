'use client'
import { FC } from 'react'
import { getI18n, Locale } from '~/app/i18n'
import { Table } from '@architecturex/components.table'

type Props = {
  headers: string[]
  rows: string[][]
}

const GuestTable: FC<Props> = async ({ headers, rows }) => {
  return <Table headers={headers} rows={rows} hoverHighlight striped rowsPerPage={10} />
}

export default GuestTable
