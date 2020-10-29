import React from 'react'
import {
  useTable,
  useGroupBy,
  useSortBy,
  useFilters
 } from 'react-table'


export default function OrderBookTableRow(props: any) {
  const row = props.row

  return (
    <tr {...row.getRowProps()}>
      {console.log(row)}
      {row.cells.map((cell, index) => {
        return (
          <td
            {...cell.getCellProps()}
            {...console.log(cell.getCellProps())}
            style={{
              padding: '10px',
              border: 'solid 1px gray',
              background: row[4].value === 'bittrex' ? 'papayawhip' : 'light-blue',
            }}
          >
            {cell.render('Cell')}
          </td>
        )
      })}
    </tr>
  )
}
