//@ts-nocheck
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
import Link from "next/link";
import {deleteRecord} from "./employees";
import generatePDF from "../helpers/ReportGenerator";
import ImageViewer from "../components/global/ImageViewer";

export default function SalesHome () {
    const [sale, setSale] = useState({});
    const [deleteRow, setDeleteRow] = useState({});
    const [showingImage, setShowingImage] = useState({});
    const [loading, setLoading] = useState(false);
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const [shouldShowImage, setShouldShowImage] = useState(false);
    const type = "sales";
    const dispatch = useAppDispatch();
    const [data, setData] = useState([]);
    const {
        sales,
        pending,
        error,
    } = useAppSelector(salesSelector);

    useEffect(() => {
        dispatch(fetchSales());
    }, [type]);

    useEffect(() => {
        setData(sales);
    }, [sales]);

    const editSale = () => {
        setShouldShowDialog(true);
    }

    const onClose = () => setShouldShowDialog(false);

    const closeImageView = () => setShouldShowImage(false);

    const displaySaleImage = (sale) => {
        setShowingImage(sale);
        setShouldShowImage(true);
    }

    const columns = getTableColumns(type, displaySaleImage);

    return (
        <>
            <Header />
            <div className={styles.main}>
                {(loading || pending) ? <ProgressLoader message={"Loading..."}/> : <></>}
                {shouldShowDialog ?
                    <Dialog
                        type={type}
                        title={"Add a new sale"}
                        actionText={"Add"}
                        onClose={onClose}
                        reRender={() => {
                        }}
                        initialItem={sale}
                        setLoading={setLoading}
                    />
                    : <></>
                }
                {shouldShowImage ?
                    <ImageViewer
                        title={`${showingImage.type}`}
                        onClose={closeImageView}
                        imagePath={showingImage.attachment}
                    />
                    : <></>}
                <ToastContainer/>

                <div className={styles.top_row}>
                    <h2><Link href={"/"}>Home</Link> • Sales</h2>
                    <button className={styles.add_button} onClick={editSale}>Add sale</button>
                    <button className={styles.add_button} onClick={() => deleteRecord(type, deleteRow, dispatch)}
                            disabled={typeof deleteRow?.id === 'undefined'}>Delete sale
                    </button>
                    <button className={styles.add_button} onClick={() => generatePDF(type, data)}>Export sales data</button>
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
