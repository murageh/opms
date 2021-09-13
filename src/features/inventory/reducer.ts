import {createReducer} from '@reduxjs/toolkit';
import {addItem, deleteItem, fetchInventory, Item} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";
import {refreshPage} from "../../pages";


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

export function fetchError () {
    errorToaster("Could not fetch data. Check backend configuration.");
}

export function addError () {
    errorToaster("Could not add data. Check backend configuration.");
}

export function deleteError () {
    errorToaster("Could not delete data. Check backend configuration.");
}


export const inventoryReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchInventory.pending, state => {
            state.pending = true;
        })
        .addCase(fetchInventory.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log("got", payload);
            state.inventory = payload.data ?? state.inventory;
        })
        .addCase(fetchInventory.rejected, state => {
            state.pending = false;
            state.error = true;
            fetchError();
        })
        //addItem
        .addCase(addItem.pending, state => {
            state.pending = true;
        })
        .addCase(addItem.fulfilled, (state, {payload}) => {
            state.pending = false;
            successToaster(payload.message);
            // payload.status === "success" && refreshPage();
        })
        .addCase(addItem.rejected, state => {
            state.pending = false;
            state.error = true;
            addError();
        })
        //deleteItem
        .addCase(deleteItem.pending, state => {
            state.pending = true;
        })
        .addCase(deleteItem.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(deleteItem.rejected, state => {
            state.pending = false;
            state.error = true;
            deleteError();
        });
});