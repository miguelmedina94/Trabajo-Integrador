import { AssetDTO } from "../DTO/assetDTO";


export const getAllAssets = async (items, page) => {
    try {
        const url = `http://localhost:5000/api/assets?items=${items}&page=${page}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        const { totalItems, assetList } = dataResponse.data;
        const assets = [];
        assetList.forEach(actAsset => {
            const assetDTO = new AssetDTO(actAsset);
            assets.push(assetDTO);
        });
        return {assets, totalItems};
    } catch (error) {
        throw error
    }
};

export const getAssetById = async (id) => {
    try {
        const url = `http://localhost:5000/api/assets/${id}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        const assetDTO = new AssetDTO(dataResponse.data);
        return assetDTO;
    } catch (error) {
        throw error
    }
};

export const updateAssetService = async (asset) => {
    try {
        const {id, name, type, code, description, purchase_date, employee_id} = asset;
        const url = `http://localhost:5000/api/assets/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                type,
                code,
                description,
                purchase_date,
                employee_id
            })
        });
        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        throw error
    }
};

export const deleteAssetService = async (id) => {
    try {
        const url = `http://localhost:5000/api/assets/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const dataResponse = await response.json();
        return dataResponse.data;
    } catch (error) {
        throw error
    }
};

export const createAssetService = async (asset) => {
    try{
        const { name, type, code, description, purchase_date, employee_id } = asset;
        const url = `http://localhost:5000/api/assets/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                type,
                code,
                description,
                purchase_date,
                employee_id
            })
        });
        const dataResponse = await response.json();
        return dataResponse.data;
    }catch(error){
        throw error;
    }
};