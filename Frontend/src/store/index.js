import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./empleadosSlice/slice";
import assetsSlice from "./assetsSlice/slice"
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
        employees: employeesSlice,
        assets: assetsSlice
    },
    middleware: [thunk],
});
