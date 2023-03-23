import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEmployees, updateEmployeeById } from "../../services/httpServices";

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async () => {
    const response = await getAllEmployees()
    return response;
    }
)

const initialState = {
    employees : []
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers:{
        cargarEmployees: (state, action) => {
            console.log('se carga employees');
            state.employees = {...action.payload}
        },
        nuevoEmpleado: (state,action) => {
            state.employees.push(action.payload);
            state.idNuevo++;
        },
        reemplazarEmpleado: (state,action) => {
            const findIndex = state.employees.findIndex(employee => employee.id === action.payload.id);
            state.employees[findIndex] = action.payload;
            const serviceResponse =   updateEmployeeById(action.payload);
            console.log(serviceResponse);
        },
        eliminarEmpleado: (state, action) => {
            for(let i = 0 ; i < action.payload.length ; i++){
                state.employees = state.employees.filter(empleado => empleado.id !== action.payload[i])
            }
        }
    },
    extraReducers: (reducers) => {
        reducers.addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = [...action.payload]
        })
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = employeesSlice.actions; 

export default employeesSlice.reducer; 