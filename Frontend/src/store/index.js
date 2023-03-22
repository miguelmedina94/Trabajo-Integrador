import { configureStore } from "@reduxjs/toolkit";
import empleadosSlice from "./empleadosSlice/slice";

export const store = configureStore({
    reducer: {
        empleados: empleadosSlice,
        idNuevo: empleadosSlice
    },
});