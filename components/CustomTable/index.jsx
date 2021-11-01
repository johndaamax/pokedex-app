import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'

const Table = styled.table`
    width: 70%;
    margin: 0 auto;
    background: #fff;
    border: 1px solid hsl(0,0%,80%);;
    border-radius: 8px;
    padding: 0.5rem;
    border-collapse: collapse;

    th {
        padding: 0.5rem;
    }

    tbody td {
        padding: 0.3rem 1rem;
        border: 1px solid #D8D8D8;
    }

    tbody td:n-th-child(2) {
        text-align: center;
    }

    .sort {
        margin-left: 0.5em;
    }

    @media screen and (max-width: 768px) {
        width: 90%;
        min-width: 320px;
    }
`
const CustomTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns, data, initialState: {
            sortBy: [{ id: 1, desc: false }]
        }
    }, useSortBy)
    return (
        <Table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ?
                                        column.isSortedDesc
                                            ? <span className='sort'>&#8593;</span>
                                            : <span className='sort'>&#8595;</span>
                                        : <span className='sort'>&#8616;</span>
                                    }
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
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default React.memo(CustomTable);
