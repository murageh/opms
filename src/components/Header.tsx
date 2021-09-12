import React from "react";
import styles from "../styles/Inventory.module.css"
import {useRouter} from "next/router";

const Header  = () => {
    const {pathname} = useRouter();

    return (
        <div className={styles.header}>
            <h1>OPMS</h1>
            <h3>Online Poultry Management System</h3>
            {pathname === "/inventory" ? "" : ""}
        </div>
    )
}

export default Header;