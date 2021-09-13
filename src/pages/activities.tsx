//@ts-nocheck
import Header from "../components/Header";
import styles from "../styles/Inventory.module.css"
import {ToastContainer} from "react-toastify";
import Dialog from "../components/global/Dialog";
import React, {useEffect, useState} from "react";
import {ProgressLoader} from "../components/global/ProgressLaoder";
import {getTableColumns, PaginatedTable} from "../helpers/TableFunctions";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {activitySelector} from "../features/activity/selectors";
import {fetchActivities} from "../features/activity/actions";
import Link from "next/link";
import {deleteRecord} from "./employees";
import generatePDF from "../helpers/ReportGenerator";

export default function ActivityHome() {
    const [activity, setActivity] = useState({});
    const [deleteRow, setDeleteRow] = useState({});
    const [loading, setLoading] = useState(false);
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const type = "activities";
    const columns = getTableColumns(type);
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    const {
        activities,
        pending,
        error,
    } = useAppSelector(activitySelector);

    useEffect(() => {
        dispatch(fetchActivities());
    }, [type]);

    useEffect(() => {
        setData(activities);
    }, [activities]);

    const editActivity = () => {
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
                        title={"Add a new activities"}
                        actionText={"Add"}
                        onClose={onClose}
                        reRender={() => {
                        }}
                        initialActivity={activity}
                        setLoading={setLoading}
                    />
                    : <></>}
                <ToastContainer/>

                <div className={styles.top_row}>
                    <h2><Link href={"/"}>Home</Link> • Farm activities</h2>
                    <button className={styles.add_button} onClick={editActivity}>Add activity</button>
                    <button className={styles.add_button} onClick={() => deleteRecord(type, deleteRow, dispatch)}
                            disabled={typeof deleteRow?.id === 'undefined'}>Delete activity
                    </button>
                    <button className={styles.add_button} onClick={() => generatePDF(type, data)}>Export activity data</button>
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
