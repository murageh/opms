import {useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable,} from "react-table";
import {GlobalFilter} from "../components/GlobalFilter";
import BottomNavBar from "../components/BottomNavBar";

export function getTableColumns(type: string) {
    return type === "employees"
        ? [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Phone",
                accessor: "mobileno",
            },
            {
                Header: "Salary",
                accessor: "salary",
            },
        ]
        : type === "sales"
            ? [
                {
                    Header: "Type",
                    accessor: "type",
                },
                {
                    Header: "Units",
                    accessor: "quantity",
                },
                {
                    Header: "Unit Price",
                    accessor: "unit_price",
                },
                {
                    Header: "Total Price",
                    accessor: "total_price",
                },
                {
                    Header: "Additional Info",
                    accessor: "additional_info",
                },
                {
                    Header: "Date",
                    accessor: "date",
                },
            ]
            : type === "activities"
                ? [
                    {
                        Header: "Type",
                        accessor: "type",
                    },
                    {
                        Header: "Name",
                        accessor: "name",
                    },
                    {
                        Header: "Courtesy of",
                        accessor: "courtesy",
                    },
                    {
                        Header: "Date",
                        accessor: "date",
                    },
                ]
                : type === "items" || type === "inventory"
                    ? [
                        {
                            Header: "Item",
                            accessor: "name",
                        },
                        {
                            Header: "Quantity",
                            accessor: "quantity",
                        },
                        {
                            Header: "Total Cost",
                            accessor: "total_cost",
                        },
                        {
                            Header: "Added by",
                            accessor: "courtesy_of",
                        },
                        {
                            Header: "Added on",
                            accessor: "date_time",
                        },
                    ]
                    : [
                        {
                            Header: "Select an option above",
                            accessor: "sample_accessor",
                        },
                    ];
}

export function PaginatedTable({columns, data, type, setData}) {
    // Use the state and functions returned from useTable to build your UI

    // console.log("received ", data);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        prepareRow,
        toggleAllRowsSelected,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 10},
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
    );

    const {globalFilter, pageIndex, pageSize} = state;

    // Render the UI for your table
    return (
        <>
            <div className={"action-bar"}>
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                    type={type}
                />
            </div>

            <div className={"table-container"}>
                <div className={"table-holder"}>
                    <table {...getTableProps()}>
                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.name}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())} key={column.name}
                                    >
                                        {column.render("Header")}
                                        <span>
                        {column.isSorted
                            ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                            : ""}
                      </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    key={i}
                                    {...row.getRowProps()}
                                    className={"tableRow"}
                                    onContextMenu={(e) => {
                                        toggleAllRowsSelected(false);
                                        row.toggleRowSelected(row);
                                    }}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                key={cell.name}
                                                {...cell.getCellProps()}
                                                onClick={() => {
                                                    toggleAllRowsSelected(false);
                                                    row.toggleRowSelected(row);
                                                }}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <BottomNavBar
                    dataSize={data.length}
                    dataType={type}
                    pageIndex={pageIndex}
                    pageOptions={pageOptions}
                    pageSize={pageSize}
                    pageCount={pageCount}
                    setPageSize={setPageSize}
                    gotoPage={gotoPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                />

            </div>
        </>
    )
        ;
}
