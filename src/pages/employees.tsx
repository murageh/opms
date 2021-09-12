import Header from "../components/Header";
import styles from "../styles/Inventory.module.css"
import {ToastContainer} from "react-toastify";
import Dialog from "../components/global/Dialog";
import React, {useEffect, useState} from "react";
import {ProgressLoader} from "../components/global/ProgressLaoder";
import {getTableColumns, PaginatedTable} from "../helpers/TableFunctions";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {salesSelector} from "../features/sales/selectors";
import {fetchSales} from "../features/sales/actions";
import {employeeSelector, fetchEmployees} from "../features/employees";
import Link from "next/link";

export default function EmployeesHome () {
    const [employee, setEmployee] = useState({});
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

    console.log("employees", employees);
    console.log("data", data);

    const editEmployee = () => {
        setShouldShowDialog(true);
    }

    const onClose = () => setShouldShowDialog(false);

    return (
        <>
            <Header />
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
                </div>
                <div className={styles.inventory_list}>
                    <PaginatedTable
                        columns={columns}
                        type={type}
                        data={data} // table data
                        setData={setData} // used to update table contents by the date filter
                    />
                </div>
            </div>
        </>
    )
}
