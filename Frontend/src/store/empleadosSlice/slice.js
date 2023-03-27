import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEmployees, updateEmployeeService, deleteEmployeeService, createEmployeeService } from "../../services/employeeHttpServices";

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async (pagination) => {
        const { pageSize, pageSelected } = pagination
        const response = await getAllEmployees(pageSize, pageSelected);
        return response;
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee) => {
    const response = await updateEmployeeService(employee);
    return response;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (employee, {dispatch}) => {
        console.log('employees: ',employee);
        const response = await deleteEmployeeService(employee);
        if(response.EmployeeAfectedRows !== 0){
            dispatch(getEmployees())
        }
    }
);


export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (employee) => {
        console.log('employees: ',employee);
        const response = await createEmployeeService(employee);
        console.log('response: ',response);
    }
);

const initialState = {
    employees : [],
    totalItems: 0
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    extraReducers: (reducers) => {
        reducers
        .addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = [...action.payload.employees];
            state.totalItems = action.payload.totalItems;
        })
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = employeesSlice.actions; 

export default employeesSlice.reducer; 