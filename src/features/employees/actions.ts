import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import {errorToaster} from "../../helpers/Toaster";

export type Employee = {
    name: string,
    mobileno: string,
    salary: number,
}

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee: Employee) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/employees.php',
        {
            add: true,
            name: employee.name,
            mobileno: employee.mobileno,
            salary: employee.salary,
        }
    );

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/employees.php');

    typeof response.data.status === 'undefined' && errorToaster(`An error occurred. ${response}`);
    return response.data ?? {};
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
    let bodyFormData = new FormData();
    bodyFormData.append("delete", id);

    const response = await axios.post(
        'http://127.0.0.1/opms/database/employees.php',
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
