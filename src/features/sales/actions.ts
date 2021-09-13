import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import {errorToaster} from "../../helpers/Toaster";

export type Sale = {
    type: string,
    quantity: number,
    unit_price: number,
    total_price: number,
    date_time: string,
    additional_details: string,
    attachment: string,
}

export const addSale = createAsyncThunk('sales/addSale', async (sale: Sale) => {
    let bodyFormData = new FormData();
    bodyFormData.append("add", "true");
    bodyFormData.append("type", sale.type);
    bodyFormData.append("quantity", String(sale.quantity));
    bodyFormData.append("unit_price", String(sale.unit_price));
    bodyFormData.append("additional_details", sale.additional_details ?? "");
    bodyFormData.append("attachment", sale.attachment);

    const response = await axios.post(
        'http://127.0.0.1/opms/database/sales.php',
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

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/sales.php');

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const deleteSale = createAsyncThunk('sales/deleteSale', async (id: string) => {
    let bodyFormData = new FormData();
    bodyFormData.append("delete", id);

    const response = await axios.post(
        'http://127.0.0.1/opms/database/sales.php',
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