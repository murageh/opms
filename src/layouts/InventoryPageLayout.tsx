//@ts-nocheck
import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";
import {Header} from "../components/Header";

function InventoryPageLayout({children}) {
    const router = useRouter();
    const path = router.pathname;

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>OPMS | Inventory</title>
                    <meta name="description"
                          content="Online Poultry Management System."/>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/>
                </Head>
                <main className={styles.main}>
                    <Header />
                    <div className={styles.main_content}>
                        {children}
                    </div>
                </main>
            </div>
            <footer className={styles.footer}>
                <p>
                    &copy; Copyright {" "} 2021.
                    {" "}
                    Online Poultry Management System
                </p>
            </footer>
        </>
    );
}

export default InventoryPageLayout