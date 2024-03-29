//@ts-nocheck
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Inventory.module.css"
import {ToastContainer} from "react-toastify";
import Dialog from "../components/global/Dialog";
import React, {useEffect, useState} from "react";
import {ProgressLoader} from "../components/global/ProgressLaoder";
import {getTableColumns, PaginatedTable} from "../helpers/TableFunctions";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {inventorySelector} from "../features/inventory/selectors";
import {fetchInventory} from "../features/inventory/actions";
import {deleteRecord} from "./employees";
import generatePDF from "../helpers/ReportGenerator";

export default function InventoryHome () {
    const [item, setItem] = useState({});
    const [deleteRow, setDeleteRow] = useState({});
    const [loading, setLoading] = useState(false);
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const type = "inventory";
    const columns = getTableColumns(type);
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    const {
        inventory,
        pending,
        error,
    } = useAppSelector(inventorySelector);

    useEffect(() => {
        dispatch(fetchInventory());
    }, [type]);

    useEffect(() => {
        setData(inventory);
    }, [inventory]);

    const editItem = () => {
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
                        title={"Add a new item"}
                        actionText={"Add"}
                        onClose={onClose}
                        reRender={() => {
                        }}
                        initialItem={item}
                        setLoading={setLoading}
                    />
                    : <></>}
                <ToastContainer/>

                <div className={styles.top_row}>
                    <h2><Link href={"/"}>Home</Link> • Inventory</h2>
                    <button className={styles.add_button} onClick={editItem}>Add item</button>
                    <button className={styles.add_button} onClick={() => deleteRecord(type, deleteRow, dispatch)}
                            disabled={typeof deleteRow?.id === 'undefined'}>Delete selected item
                    </button>
                    <button className={styles.add_button} onClick={() => generatePDF(type, data)}>Export inventory data</button>
                </div>
                <div className={styles.inventory_list}>
                    <PaginatedTable
                        columns={columns}
                        type={"items"}
                        data={data} // table data
                        setDeleteRow={setDeleteRow}
                    />
                </div>
            </div>
        </>
    )
}
