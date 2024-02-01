import React, { FC, ReactElement, useState, useRef } from 'react'
import cx from '@architecturex/utils.cx'
import NoData from '~/app/components/SVG/NoData'

interface TableProps {
  headers: string[]
  rows: string[][]
  hoverHighlight?: boolean
  headerBgColor?: string
  rowColor?: string
  altRowColor?: string
  onRowClick?: (rowData: string[], rowIndex: number) => void
  striped?: boolean
  columnAlignments?: ('left' | 'center' | 'right')[]
  rowsPerPage?: number
  label?: string
  createButton?: ReactElement
}

const defaultColors = {
  headerBgColor: 'bg-gray-50 h-16 text-black',
  rowColor: 'bg-white h-14 text-sm',
  altRowColor: 'bg-gray-100 h-14 text-sm'
}

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const Table: FC<TableProps> = ({
  headers,
  rows: initialRows,
  hoverHighlight = false,
  headerBgColor = defaultColors.headerBgColor,
  rowColor = defaultColors.rowColor,
  altRowColor = defaultColors.altRowColor,
  onRowClick,
  striped = false,
  columnAlignments = [],
  rowsPerPage = 10,
  label = '',
  createButton = null
}) => {
  const [sortedRows, setSortedRows] = useState(initialRows)
  const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'asc' | 'desc' } | null>(
    null
  )
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage)
  const [foundRows, setFoundRows] = useState<string[][] | null>(null)

  // Sorting function
  const onHeaderClick = (colIndex: number) => {
    let direction: 'asc' | 'desc' = 'asc'

    if (sortConfig && sortConfig.key === colIndex && sortConfig.direction === 'asc') {
      direction = 'desc'
    }

    const sorted = [...getDisplayedRows()].sort((a, b) => {
      if (a[colIndex] < b[colIndex]) return direction === 'asc' ? -1 : 1
      if (a[colIndex] > b[colIndex]) return direction === 'asc' ? 1 : -1
      return 0
    })

    foundRows ? setFoundRows(sorted) : setSortedRows(sorted)
    setSortConfig({ key: colIndex, direction })
  }

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentRows = getDisplayedRows().slice(startIndex, endIndex)

  function getDisplayedRows() {
    return foundRows ? foundRows : sortedRows
  }

  return (
    <>
      {label && (
        <div className="w-[95%] m-auto mt-4 mb-0 flex items-center gap-2">
          <div className="text-xl font-semibold mr-auto">{label}</div>
          <TableSearch rows={initialRows} setFoundRows={setFoundRows} />
          {createButton && <div className="text-sm text-gray-600">{createButton}</div>}
        </div>
      )}

      <div className="w-[96%] mt-4 m-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={headerBgColor}>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={cx.join(
                      'py-2 px-4 border-b border-gray-100 text-sm font-semibold text-black tracking-wider cursor-pointer',
                      alignmentClasses[columnAlignments[idx] || 'left']
                    )}
                    onClick={() => onHeaderClick(idx)}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 && (
                <td
                  colSpan={headers.length}
                  className="py-2 px-4 border-b border-gray-200 text-sm font-semibold text-black tracking-wider text-center h-40 bg-white"
                >
                  <div className="flex items-center justify-center">
                    <NoData />
                  </div>

                  <div className="text-gray-300 font-normal">No data</div>
                </td>
              )}

              {currentRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cx.join(
                    striped && rowIndex % 2 === 0 ? altRowColor : rowColor,
                    hoverHighlight ? 'hover:bg-gray-50' : '',
                    'cursor-pointer'
                  )}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cx.join(
                        'py-2 px-4 border-b border-gray-200',
                        alignmentClasses[columnAlignments[cellIndex] || 'left']
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getDisplayedRows().length > rowsPerPage && (
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, getDisplayedRows().length)} of{' '}
              {getDisplayedRows().length} entries
            </span>
            <div>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={cx.join(
                  'px-3 py-1 text-sm border rounded-l',
                  currentPage === 1
                    ? 'cursor-not-allowed bg-gray-400 text-gray-500 hover:bg-gray-400'
                    : 'bg-white hover:bg-blue-600 hover:text-white'
                )}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={cx.join(
                  'px-3 py-1 text-sm border-t border-b border-r rounded-r -ml-1',
                  currentPage === totalPages
                    ? 'cursor-not-allowed bg-gray-400 text-gray-500 hover:bg-gray-400'
                    : 'bg-white hover:bg-blue-600 hover:text-white'
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Table

// ---- SearchInput Component ---- //
interface TableSearchProps {
  rows: string[][]
  setFoundRows: React.Dispatch<React.SetStateAction<string[][] | null>>
}

function TableSearch({ rows, setFoundRows }: TableSearchProps): React.JSX.Element {
  var inputRef = useRef<HTMLInputElement>(null)
  var [isInputVisible, setIsInputVisible] = useState(false)

  return (
    <div className="flex gap-2">
      <div
        onClick={toggleInputVisibility}
        className="hover:cursor-pointer flex justify-center items-center select-none"
      >
        🔍
      </div>
      <input
        ref={inputRef}
        onChange={(e) => handleSearch(e, rows)}
        type="search"
        placeholder="Type to search"
        className={`${isInputVisible ? 'w-60 px-2 py-1.5 text-xs  border-slate-300 ' : 'w-0'}`}
      />
    </div>
  )

  function toggleInputVisibility() {
    isInputVisible ? inputRef.current?.blur() : inputRef.current?.focus()
    setIsInputVisible((prevIsOpen) => !prevIsOpen)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>, rows: TableSearchProps['rows']) {
    var query = formatQuery(e.target.value)

    if (isValidQuery(query)) {
      let querySearchResult = rows.filter((row) => byQuery(row, query))
      setFoundRows(querySearchResult)
      console.log(querySearchResult)
    } else setFoundRows(null)
  }

  function formatQuery(query: string): string {
    return query.trim().toLowerCase()
  }

  function isValidQuery(query: string): boolean {
    return query.length > 0
  }

  function byQuery(row: string[], query: string): boolean {
    return row.some((value) => {
      return value.toLowerCase().includes(query)
    })
  }
}

/*
TODO:
- Styles
  - Search input icon
  - Search input transition
  - General styling
- Search optimization
*/
