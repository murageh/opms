//@ts-nocheck

import Link from "next/link"
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {ProgressLoader} from "../components/global/ProgressLaoder";
import axios from "axios";
import {errorToaster} from "../helpers/Toaster";

export function refreshPage() {
    window.location.reload();
}

type Data = {
    employees: {},
    sales: {},
    inventory: {},
    activities: {},
}

export function showNetworkError(type = "data", error) {
    errorToaster(`Could not load ${type}. ${error} Ensure backend is running on port 8080.`);
}

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const res = {};
        axios.get("http://127.0.0.1/opms/database/count_employees.php")
            .then((response) => {
                res.employees = response.data.count;

                axios.get("http://127.0.0.1/opms/database/count_inventory.php")
                    .then((response) => {
                        setData({...data, ...{inventory: response.data.count}});
                        res.inventory = response.data.count;

                        axios.get("http://127.0.0.1/opms/database/count_sales.php")
                            .then((response) => {
                                setData({...data, ...{sales: response.data.count}});
                                res.sales = response.data.count;

                                axios.get("http://127.0.0.1/opms/database/count_activities.php")
                                    .then((response) => {
                                        setData({...data, ...{activities: response.data.count}});
                                        res.activities = response.data.count;

                                        setData(res);
                                    });
                            });
                    });
            }).catch((error) => {
            showNetworkError("data", error);
        });

    }, []);

    return (
        <>
            <div className={styles.container}>
                <Header/>
                <div className={styles.main}>
                    {loading ? <ProgressLoader message={"Just a sec..."}/> : <></>}

                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h4>Inventory</h4>
                            <h2>{data.inventory ?? 0}</h2>
                            <h5>Items</h5>
                            <Link href={"/inventory"}>View inventory</Link>
                        </div>
                        <div className={styles.card}>
                            <h4>Farm workers</h4>
                            <h2>{data.employees ?? 0}</h2>
                            <h5>Employees</h5>
                            <Link href={"/employees"}>View employees</Link>
                        </div>
                        <div className={styles.card}>
                            <h4>Farm produce</h4>
                            <h2>{data.sales ?? 0}</h2>
                            <h5>Sales</h5>
                            <Link href={"/sales"}>View sales</Link>
                        </div>
                        <div className={styles.card}>
                            <h4>Farm work</h4>
                            <h2>{data.activities ?? 0}</h2>
                            <h5>Recorded activities</h5>
                            <Link href={"/activities"}>View activities</Link>
                        </div>
                    </div>
                    <p className={styles.p_after}>Choose an item to view the details.</p>
                    <p className={styles.p_after}>
                        You can export the details from each module. e.g. to obtain the list of employees, head to the
                        employees page and click on <code>Export Employee data</code>
                    </p>
                </div>
            </div>
        </>

    );
}

export default Home;