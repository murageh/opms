//@ts-nocheck
import "../styles/app.css"
import "react-toastify/dist/ReactToastify.css";

import {Provider} from 'react-redux';
import {store} from '../app/store';
import React from "react";
import {ToastContainer} from "react-toastify";
import '../styles/app.css'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
    const Layout = Component.Layout ? Component.Layout : React.Fragment;

    return (
            <Provider store={store}>
                <Layout>
                    <ToastContainer />
                    <Component {...pageProps} />
                </Layout>
            </Provider>
    )
}

export default MyApp
