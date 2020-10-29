import React from 'react'
import {
  useTable,
  useGroupBy,
  useSortBy,
  useFilters
 } from 'react-table'

import { API_Names } from '../libs/available-markets'

export default function OrderBookTable(props: any) {
  const data = React.useMemo(() => props.data, props.data)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rate',
        accessor: 'rate' // accessor is the "key" in the data
      },
      {
        Header: 'Total Liquidity',
        accessor: API_Names.totalLiquidity
      },
      {
        Header: 'Bittrex',
        accessor: API_Names.bittrex
      },
      {
        Header: 'Poloniex',
        accessor: API_Names.poloniex
      },
      {
        Header: 'Volume',
        accessor: API_Names.volume
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
      columns,
      data,
    },
    useSortBy,
   )

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}

                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                let bgColor: string

                if (index === 2 && row.cells[4].value === 'bittrex') {
                  bgColor = 'lightblue'
                } else if (index === 3 && row.cells[4].value === 'poloniex') {
                  bgColor = 'lightblue'
                } else {
                  bgColor = 'papayawhip'
                }

                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: bgColor,
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
