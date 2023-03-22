import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    empleados : [
        {
            id: '1',
            nombre: 'Miguel Angel',
            apellido: 'Medina',
            email: 'miiguelmedina@gmail.com',
            telefono: 381448899,
            fecha_contrato: '2023-02-01',
            salario: 1234,
            comision: 5
        },
        {
            id: '2',
            nombre: 'Pablo Mariano',
            apellido: 'Alderete',
            email: 'mariano_mpk@hotmail.es',
            telefono: 381556677,
            fecha_contrato: '2018-05-15',
            salario: 2222,
            comision: 15
        },
        {
            id: '3',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            telefono: 381112233,
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        }
    ],
    idNuevo:4
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