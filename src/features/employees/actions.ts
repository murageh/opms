import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

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
    return response.data;
});

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get('http://127.0.0.1/opms/database/employees.php');

    return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    const response = await axios.post(
        'http://127.0.0.1/opms/database/employees.php',
        {
            delete: [id],
        }
    );

    return response.data;
});
