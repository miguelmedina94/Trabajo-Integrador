import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEmployees, updateEmployeeService, deleteEmployeeService } from "../../services/httpServices";

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
            console.log('index: ', findIndex);
            const serviceResponse =  updateEmployee(action.payload);
            console.log(serviceResponse);
        },
        eliminarEmpleado: (state, action) => {
            for(let i = 0 ; i < action.payload.length ; i++){
                state.employees = state.employees.filter(empleado => empleado.id !== action.payload[i])
            }
        }
    },
    extraReducers: (reducers) => {
        reducers
        .addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = [...action.payload];
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            if(action.payload.code !== 200){
                getEmployees();
            }
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            
        })
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = employeesSlice.actions; 

export default employeesSlice.reducer; 