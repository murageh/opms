import {createReducer} from '@reduxjs/toolkit';
import {addEmployee, deleteEmployee, Employee, fetchEmployees} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";
import {refreshPage} from "../../pages";

type CounterState = {
    count: number,
    employees: Employee [],
    pending: boolean,
    error: boolean,
    error_message: string,
};

const initialState: CounterState = {
    count: 0,
    employees: [],
    pending: false,
    error: false,
    error_message: "",
};


export const employeeReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchEmployees.pending, state => {
            state.pending = true;
        })
        .addCase(fetchEmployees.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            state.employees = payload.data;
        })
        .addCase(fetchEmployees.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //addEmployee
        .addCase(addEmployee.pending, state => {
            state.pending = true;
        })
        .addCase(addEmployee.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(addEmployee.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //deleteEmployee
        .addCase(deleteEmployee.pending, state => {
            state.pending = true;
        })
        .addCase(deleteEmployee.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(deleteEmployee.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        });
});