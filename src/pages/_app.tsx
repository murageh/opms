//@ts-nocheck
import "react-toastify/dist/ReactToastify.css";

import {Provider} from 'react-redux';
import {store} from '../app/store';
import React from "react";
import {ToastContainer} from "react-toastify";
import '../styles/globals.css'

function MyApp({Component, pageProps}) {

    return (
            <Provider store={store}>
                <div className={"app"}>
                    <ToastContainer />
                    <Component {...pageProps} />
                </div>
            </Provider>
    )
}

export default MyApp
