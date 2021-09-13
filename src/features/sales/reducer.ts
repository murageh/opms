import {createReducer} from '@reduxjs/toolkit';
import {addSale, deleteSale, fetchSales, Sale} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";
import {refreshPage} from "../../pages";
import {deleteItem} from "../inventory/actions";
import {deleteError} from "../inventory/reducer";


type CounterState = {
    count: number,
    sales: Sale [],
    pending: boolean,
    error: boolean,
    error_message: string,
};

const initialState: CounterState = {
    count: 0,
    sales: [],
    pending: false,
    error: false,
    error_message: "",
};


export const salesReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchSales.pending, state => {
            state.pending = true;
        })
        .addCase(fetchSales.fulfilled, (state, {payload}) => {
            state.pending = false;
            state.sales = payload.data ?? state.sales;
        })
        .addCase(fetchSales.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //addSale
        .addCase(addSale.pending, state => {
            state.pending = true;
        })
        .addCase(addSale.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(addSale.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //deleteSale
        .addCase(deleteSale.pending, state => {
            state.pending = true;
        })
        .addCase(deleteSale.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(deleteSale.rejected, state => {
            state.pending = false;
            state.error = true;
            deleteError();
        });
});