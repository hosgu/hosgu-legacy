// EXPERIMENTAL COMPONENT
'use client'
import { useState, useRef } from 'react'

export default function SearchInput({ rows, setFilteredRows }: Props) {
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
        name="searchQuery"
        placeholder="Type to search"
        className={`${isInputVisible ? 'w-60 px-2 py-1.5 text-xs  border-slate-300 ' : 'w-0'}`}
      />
    </div>
  )

  function toggleInputVisibility() {
    isInputVisible ? inputRef.current?.blur() : inputRef.current?.focus()
    setIsInputVisible((prevIsOpen) => !prevIsOpen)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>, rows: Props['rows']) {
    var query = formatQuery(e.target.value)

    if (isValidQuery(query)) {
      let querySearchResult = rows.filter((row) => byQuery(row, query))
      setFilteredRows(querySearchResult)
    } else setFilteredRows(null)
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

interface Props {
  rows: string[][]
  setFilteredRows: React.Dispatch<React.SetStateAction<string[][] | null>>
}

/*
TODO:

1. Style
  1.1 Search input icon
  1.2 Search input animation / transition
  1.3 General styling

2. Search scope (Current is global, all rows NOT LIMITED TO PAGINATION)
  2.1 Previous and Next button search reset? (if it is paginated)
  2.2 Sorting functionality (doesn't work)
  2.3 Pagination

3. Search input security
4. Search optimization
5. Code refactoring (readable, maintenable, types)
*/
