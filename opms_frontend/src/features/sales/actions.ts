import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export type Sale = {
    type: string,
    quantity: number,
    unit_price: number,
    total_price: number,
    date_time: string,
    additional_details: string,
}

export const addSale = createAsyncThunk('sales/addSale', async (sale: Sale) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/sales.php',
        {
            add: true,
            type: sale.type,
            quantity: sale.quantity,
            unit_price: sale.unit_price,
            total_price: sale.total_price,
            date_time: sale.date_time,
            additional_details: sale.additional_details ?? "",
        }
    );
    return response.data;
});

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/sales.php');

    return response.data;
});
