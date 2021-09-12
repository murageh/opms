import {createReducer} from '@reduxjs/toolkit';
import {addSale, fetchSales, Sale} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";


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
            console.log(payload)
            state.sales = payload.data;
            successToaster(payload.message);
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
        })
        .addCase(addSale.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
});