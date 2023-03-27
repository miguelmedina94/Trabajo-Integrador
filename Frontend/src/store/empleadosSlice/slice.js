import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEmployees, updateEmployeeService, deleteEmployeeService, createEmployeeService } from "../../services/employeeHttpServices";

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async (pagination) => {
        try {
            const { pageSize, pageSelected } = pagination
            const response = await getAllEmployees(pageSize, pageSelected);
            return response;
        } catch (error) {
            throw error
        }
        
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee) => {
        try {
            const response = await updateEmployeeService(employee);
            return response;
        } catch (error) {
            throw error
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (action, {dispatch}) => {
        try {
            const response = await deleteEmployeeService(action.employee);
            if(response.EmployeeAfectedRows !== 0){
                dispatch(getEmployees({pageSize: action.pageSize, pageSelected: 0}))
            }
        } catch (error) {
            throw error
        }
        
    }
);


export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (employee) => {
        try {
            const response = await createEmployeeService(employee);
            return response;
        } catch (error) {
            throw error
        }
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