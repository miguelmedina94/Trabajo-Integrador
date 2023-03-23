import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./empleadosSlice/slice";
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
        employees: employeesSlice,
    },
    middleware: [thunk],
});
