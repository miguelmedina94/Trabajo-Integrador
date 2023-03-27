import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllAssets, updateAssetService, deleteAssetService, createAssetService } from "../../services/assetHttpServices";

export const getAssets = createAsyncThunk(
    'assets/getAssets',
    async (pagination) => {
        try {
            const { pageSize, pageSelected } = pagination
            const response = await getAllAssets(pageSize, pageSelected);
            return response;
        } catch (error) {
            throw error
        }
        
    }
);

export const updateAsset = createAsyncThunk(
    'assets/updateAsset',
    async (asset) => {
        try {
            const response = await updateAssetService(asset);
            return response;
        } catch (error) {
            throw error
        }
    }
);

export const deleteAsset = createAsyncThunk(
    'assets/deleteAsset',
    async (action, {dispatch}) => {
        try {
            const response = await deleteAssetService(action.asset);
            if(response.afectedRows !== 0){
                dispatch(getAssets({pageSize: action.pageSize, pageSelected: 0}))
            }
        } catch (error) {
            throw error
        }
    }
);


export const createAsset = createAsyncThunk(
    'assets/createAsset',
    async (asset) => {
        try {
            const response = await createAssetService(asset);
            return response;
        } catch (error) {
            throw error
        }
    }
);

const initialState = {
    assets : [],
    totalItems: 0
}

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    extraReducers: (reducers) => {
        reducers
        .addCase(getAssets.fulfilled, (state, action) => {
            state.assets = [...action.payload.assets];
            state.totalItems = action.payload.totalItems;
        })
    }
});

export const {nuevoEmpleado,reemplazarEmpleado,eliminarEmpleado} = assetsSlice.actions; 

export default assetsSlice.reducer; 