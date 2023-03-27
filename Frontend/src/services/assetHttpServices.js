import { AssetDTO } from "../DTO/assetDTO";


export const getAllAssets = async (items, page) => {
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
};

export const getAssetById = async (id) => {
    const url = `http://localhost:5000/api/assets/${id}`;
    const response = await fetch(url);
    const dataResponse = await response.json();
    const assetDTO = new AssetDTO(dataResponse.data);
    return assetDTO;
};

export const updateAssetService = async (asset) => {
    console.log('sale de service: ',asset);
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
    console.log(dataResponse);
    return dataResponse;
};

export const deleteAssetService = async (id) => {
    const url = `http://localhost:5000/api/assets/${id}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const dataResponse = await response.json();
    return dataResponse.data;
};

export const createAssetService = async (asset) => {
    const { first_name, last_name, cuit, team_id, join_date, rol } = asset;
    const url = `http://localhost:5000/api/assets/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            cuit,
            team_id,
            join_date,
            rol
        })
    });
    const dataResponse = await response.json();
    return dataResponse.data;
};