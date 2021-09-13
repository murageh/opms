import {useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable,} from "react-table";
import {GlobalFilter} from "../components/GlobalFilter";
import BottomNavBar from "../components/BottomNavBar";
import {useAppDispatch} from "../app/hooks";
import {useState} from "react";
import {deleteEmployee} from "../features/employees";
import {deleteActivity} from "../features/activity/actions";
import {deleteItem} from "../features/inventory/actions";
import {deleteSale} from "../features/sales/actions";
import {Checkbox} from "../components/global/CheckBox";

export function getTableColumns(type: string) {
    return type === "employees"
        ? [
            {
                Header: "Id",
                accessor: "id"
            },
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
            {
                Header: "Employee since",
                accessor: "date_joined",
            },
        ]
        : type === "sales"
            ? [
                {
                    Header: "Id",
                    accessor: "id",
                },
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
                        Header: "Id",
                        accessor: "id",
                    },
                    {
                        Header: "Type",
                        accessor: "type",
                    },
                    {
                        Header: "Courtesy of",
                        accessor: "courtesy",
                    },
                    {
                        Header: "Date",
                        accessor: "datetime",
                    },
                    {
                        Header: "Additional info",
                        accessor: "additional_info",
                    },
                ]
                : type === "items" || type === "inventory"
                    ? [
                        {
                            Header: "Id",
                            accessor: "id",
                        },
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

export function PaginatedTable({columns, data, type, setDeleteRow}) {
    const dispatch = useAppDispatch();
    const [selectedRow, setSelectedRow] = useState("none selected");

    const getSelectedRow = (selectedFlatRow) => {
        return selectedFlatRow.original.name;
    };

    const deleteRow = (selectedFlatRows) => {
        let name = "none selected";
        let id = String(NaN);

        // if the array is not empty
        if (selectedFlatRows.length > 0) {
            // currently does not support multi-select
            // thus array contains only one  item - index 0
            id = getSelectedRow(selectedFlatRows[0]);
            name = getSelectedRow(selectedFlatRows[1]);
            if (window.confirm("Do you want to delete " + name + "?")) {
                if (type === "employees") {
                    dispatch(deleteEmployee(id))
                } else {
                    if (type === "activities") {
                        dispatch(deleteActivity(id));
                    } else {
                        if (type === "sales") {
                            dispatch(deleteSale(id));
                        }
                    }
                }
            }
        } else return;
    };

    // console.log("received ", data);
    // eslint-disable-next-line react/display-name
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
        state: { selectedRowIds },
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
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        // eslint-disable-next-line react/display-name
                        Header: ({getToggleAllRowsSelectedProps}) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        // eslint-disable-next-line react/display-name
                        Cell: ({row}) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ];
            });
        }
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
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                key={cell.name}
                                                {...cell.getCellProps()}
                                                onClick={() => {
                                                    toggleAllRowsSelected(false);
                                                    row.toggleRowSelected(row);
                                                    setDeleteRow(selectedFlatRows[0]?.values)
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
