import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEmployees, updateEmployeeService, deleteEmployeeService } from "../../services/employeeHttpServices";

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async () => {
    const response = await getAllEmployees()
    return response;
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee) => {
    console.log('createasynthunk');
    const response = await updateEmployeeService(employee);
    return response;
    }
)

export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (employee, {dispatch}) => {
        console.log('employees: ',employee);
        const response = await deleteEmployeeService(employee);
        if(response.EmployeeAfectedRows !== 0){
            dispatch(getEmployees())
        }
    }
)

const initialState = {
    employees : []
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    extraReducers: (reducers) => {
        reducers
        .addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = [...action.payload];
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            console.log('addcase', action.payload);
            if(action.payload.code !== 200){
                //getEmployees();
            }
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            
        })
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = employeesSlice.actions; 

export default employeesSlice.reducer; 