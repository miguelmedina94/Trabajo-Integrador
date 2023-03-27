import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllAssets, updateAssetService, deleteAssetService, createAssetService } from "../../services/assetHttpServices";

export const getAssets = createAsyncThunk(
    'assets/getAssets',
    async (pagination) => {
        const { pageSize, pageSelected } = pagination
        const response = await getAllAssets(pageSize, pageSelected);
        return response;
    }
);

export const updateAsset = createAsyncThunk(
    'assets/updateAsset',
    async (asset) => {
    const response = await updateAssetService(asset);
    return response;
    }
);

export const deleteAsset = createAsyncThunk(
    'assets/deleteAsset',
    async (asset, {dispatch}) => {
        console.log('assets: ',asset);
        const response = await deleteAssetService(asset);
        if(response.AssetAfectedRows !== 0){
            dispatch(getAssets())
        }
    }
);


export const createAsset = createAsyncThunk(
    'assets/createAsset',
    async (asset) => {
        console.log('assets: ',asset);
        const response = await createAssetService(asset);
        console.log('response: ',response);
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