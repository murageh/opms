import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import {errorToaster} from "../../helpers/Toaster";

export type Activity = {
    type: string,
    datetime: string,
    courtesy: string,
    additional_details: string,
}

export const addActivity = createAsyncThunk('activities/addActivity', async (activity: Activity) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/activities.php',
        {
            add: true,
            type: activity.type,
            datetime: activity.datetime,
            courtesy: activity.courtesy,
            additional_details: activity.additional_details,
        }
    );

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/activities.php');

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const deleteActivity = createAsyncThunk('activities/deleteActivity', async (id: string) => {
    let bodyFormData = new FormData();
    bodyFormData.append("delete", id);

    const response = await axios.post(
        'http://127.0.0.1/opms/database/activities.php',
        bodyFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data; boundary=${data._boundary}",
            }
        }
    );

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});