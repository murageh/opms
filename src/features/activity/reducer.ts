import {createReducer} from '@reduxjs/toolkit';
import {Activity, addActivity, deleteActivity, fetchActivities} from "./actions";
import {errorToaster, successToaster} from "../../helpers/Toaster";
import {refreshPage} from "../../pages";

type CounterState = {
    count: number,
    activities: Activity [],
    pending: boolean,
    error: boolean,
    error_message: string,
};

const initialState: CounterState = {
    count: 0,
    activities: [],
    pending: false,
    error: false,
    error_message: "",
};


export const activityReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchActivities.pending, state => {
            state.pending = true;
        })
        .addCase(fetchActivities.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            state.activities = payload.data;
        })
        .addCase(fetchActivities.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //addActivity
        .addCase(addActivity.pending, state => {
            state.pending = true;
        })
        .addCase(addActivity.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(addActivity.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        })
        //deleteActivity
        .addCase(deleteActivity.pending, state => {
            state.pending = true;
        })
        .addCase(deleteActivity.fulfilled, (state, {payload}) => {
            state.pending = false;
            console.log(payload)
            successToaster(payload.message);
            payload.status === "success" && refreshPage();
        })
        .addCase(deleteActivity.rejected, state => {
            state.pending = false;
            state.error = true;
            errorToaster(state.error_message);
        });
});