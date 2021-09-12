import {createReducer} from '@reduxjs/toolkit';
import {addItem, deleteItem, fetchInventory, Item} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";


type CounterState = {
    count: number,
    inventory: Item [],
    pending: boolean,
    error: boolean,
    error_message: string,
};

const initialState: CounterState = {
    count: 0,
    inventory: [],
    pending: false,
    error: false,
    error_message: "",
};


export const inventoryReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchInventory.pending, state => {
            state.pending = true;
        })
        .addCase(fetchInventory.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log("got", payload);
            state.inventory = payload.data;
        })
        .addCase(fetchInventory.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //addItem
        .addCase(addItem.pending, state => {
            state.pending = true;
        })
        .addCase(addItem.fulfilled, (state, {payload}) => {
            state.pending = false;
            successToaster(payload.message);
        })
        .addCase(addItem.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //deleteItem
        .addCase(deleteItem.pending, state => {
            state.pending = true;
        })
        .addCase(deleteItem.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
        })
        .addCase(deleteItem.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        });
});