import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import {errorToaster} from "../../helpers/Toaster";

export type Item = {
    name: string,
    quantity: number,
    total_cost: number,
    courtesy_of: string,
}

export const addItem = createAsyncThunk('inventory/addItem', async (item: Item) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/inventory.php',
        {
            add: true,
            name: item.name,
            quantity: item.quantity,
            cost: item.total_cost,
            courtesy: item.courtesy_of,
        }
    );

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const fetchInventory = createAsyncThunk('inventory/fetchItems', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/inventory.php');

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const deleteItem = createAsyncThunk('inventory/deleteItem', async (id: string) => {
    let bodyFormData = new FormData();
    bodyFormData.append("delete", id);

    const response = await axios.post(
        'http://127.0.0.1/opms/database/inventory.php',
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