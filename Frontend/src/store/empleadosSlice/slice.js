import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    empleados : []
}

export const empleadosSlice = createSlice({
    name: 'empleados',
    initialState,
    reducers:{
        nuevoEmpleado: (state,action) => {
            state.empleados.push(action.payload);
            state.idNuevo++;
        },
        reemplazarEmpleado: (state,action) => {
            state.empleados[action.payload.id-1] = action.payload;
        },
        eliminarEmpleado: (state, action) => {
            for(let i = 0 ; i < action.payload.length ; i++){
                state.empleados = state.empleados.filter(empleado => empleado.id !== action.payload[i])
            }
        }
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = empleadosSlice.actions; 

export default empleadosSlice.reducer; 