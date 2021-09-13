// @ts-nocheck
import Header from "../components/Header";
import styles from "../styles/Inventory.module.css"
import {ToastContainer} from "react-toastify";
import Dialog from "../components/global/Dialog";
import React, {useEffect, useState} from "react";
import {ProgressLoader} from "../components/global/ProgressLaoder";
import {getTableColumns, PaginatedTable} from "../helpers/TableFunctions";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {deleteEmployee, employeeSelector, fetchEmployees} from "../features/employees";
import Link from "next/link";
import {deleteActivity} from "../features/activity/actions";
import {deleteItem} from "../features/inventory/actions";
import {deleteSale} from "../features/sales/actions";
import generatePDF from "../helpers/ReportGenerator";

export const deleteRecord = (type, row, dispatch) => {
    if (typeof row.id !== 'undefined') {
        const confirm = window.confirm(`Delete ${row.name ?? row.type}?`)
        if (confirm)
            type === "employees" ? dispatch(deleteEmployee(row.id))
                : type === "activities" ? dispatch(deleteActivity(row.id))
                    : type === "inventory" ? dispatch(deleteItem(row.id))
                        : type === "sales" ? dispatch(deleteSale(row.id))
                            : console.log("")
    }
}

export default function EmployeesHome() {
    const [employee, setEmployee] = useState({});
    const [deleteRow, setDeleteRow] = useState({});
    const [loading, setLoading] = useState(false);
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const type = "employees";
    const columns = getTableColumns(type);
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    const {
        employees,
        pending,
        error,
    } = useAppSelector(employeeSelector);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [type]);

    useEffect(() => {
        setData(employees);
    }, [employees]);

    const editEmployee = () => {
        setShouldShowDialog(true);
    }

    const onClose = () => setShouldShowDialog(false);

    return (
        <>
            <Header/>
            <div className={styles.main}>
                {(loading || pending) ? <ProgressLoader message={"Loading..."}/> : <></>}
                {shouldShowDialog ?
                    <Dialog
                        type={type}
                        title={"Add a new employee"}
                        actionText={"Add"}
                        onClose={onClose}
                        reRender={() => {
                        }}
                        initialItem={employee}
                        setLoading={setLoading}
                    />
                    : <></>}
                <ToastContainer/>

                <div className={styles.top_row}>
                    <h2><Link href={"/"}>Home</Link> • Farm employees</h2>
                    <button className={styles.add_button} onClick={editEmployee}>Add employee</button>
                    <button className={styles.add_button} onClick={() => deleteRecord(type, deleteRow, dispatch)}
                            disabled={typeof deleteRow?.id === 'undefined'}>Delete selected employee
                    </button>
                    <button className={styles.add_button} onClick={() => generatePDF(type, data)}>Export employee data</button>
                </div>
                <div className={styles.inventory_list}>
                    <PaginatedTable
                        columns={columns}
                        type={type}
                        data={data} // table data
                        setDeleteRow={setDeleteRow}
                    />
                </div>
            </div>
        </>
    )
}
