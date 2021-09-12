import {createReducer} from '@reduxjs/toolkit';
import {addEmployee, deleteEmployee, Employee, fetchEmployees} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";

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
            successToaster(payload.message);
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
        })
        .addCase(deleteEmployee.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        });
});