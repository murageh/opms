import React from "react";
import Link from "next/link"
import styles from "../styles/Inventory.module.css"
import {useRouter} from "next/router";

const Header  = () => {
    const {pathname} = useRouter();

    return (
        <div className={styles.header}>
            <div>
                <h1>OPMS</h1>
                <h3>Online Poultry Management System</h3>
                {pathname === "/inventory" ? "" : ""}
            </div>
            <div>
                {pathname !== "/" ? <Link href={"/"}>Back to home</Link> : <h4>Hi, welcome.</h4>}
            </div>

        </div>
    )
}

export default Header;