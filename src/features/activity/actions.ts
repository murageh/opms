import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export type Activity = {
    type: string,
    date_time: string,
    courtesy_of: string,
    additional_details: string,
}

export const addActivity = createAsyncThunk('activities/addActivity', async (activity: Activity) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/activities.php',
        {
            type: [activity.type],
            date_time: [activity.date_time],
            courtesy_of: [activity.courtesy_of],
            additional_details: [activity.additional_details],
        }
    );
    return response.data.data;
});

export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/activities.php');

    return response.data.data;
});

export const deleteActivity = createAsyncThunk('activities/deleteActivity', async (id) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/activities.php',
        {
            delete: [id],
        }
    );

    return response.data.data;
});