const assetModel = require('../models/asset-model');
const employeeModel = require('../models/employee-model');
const queryAsset = require('../utils/createQuery/where-asset');
const completeAsset = require('../utils/merge/asset');

class AssetsService {
    static async findAllAssets (paramsQuery) {
        const whereQuery = queryAsset(paramsQuery);
        const modelResponse = await assetModel.findAllAssets(whereQuery);
        return modelResponse.length > 0 ? modelResponse : null;
    }

    static async findPaginatedAssets (items, page) {
        const allAssetsResponse = await this.findAllAssets();
        if(allAssetsResponse.length <= items){
            return allAssetsResponse;
        }
        let offset;
        if(page === 1){
            offset = 0;
        }else{
            offset = (page-1)*items;
        }
        const modelResponse = await assetModel.findPaginatedAssets(items, offset);
        return modelResponse.length > 0 ? modelResponse : null;
    }

    static async findAssetById (id) {
        const modelResponse = await assetModel.findAssetById(id);
        return modelResponse.length > 0 ? modelResponse[0] : null;
    }

    static async findAssetByEmployeeId (id) {
        const modelResponse = await assetModel.findAssetByEmployeeId(id);
        return modelResponse.length > 0 ? modelResponse : null;
    }

    static async createAsset (asset) {
        const findEmployeeResponse = await employeeModel.findEmployeeById(asset.employee_id);
        console.log(findEmployeeResponse);
        if(findEmployeeResponse.length === 0){
            return 404;
        }
        const modelResponse = await assetModel.createAsset(asset);
        return modelResponse ? modelResponse : null;
    }

    static async updateAsset (asset, id) {
        const findAssetResponse = await this.findAssetById (id);
        if(findAssetResponse){
            const findEmployeeResponse = await employeeModel.findEmployeeById(asset.employee_id);
            if(findEmployeeResponse.length === 0){
                return 404;
            }
            const updatedEmployee = completeAsset(asset,findAssetResponse);
            const updateResponse = await assetModel.updateAsset(updatedEmployee,id);
            return updateResponse ? {afectedRows: updateResponse} : 400;
        }else{
            return 404;
        }
    }

    static async deleteAsset (id) {
        const findResponse = await this.findAssetById(id);
        if(findResponse){
            const deleteResponse = await assetModel.deleteAsset(id);
            return deleteResponse ? {afectedRows: deleteResponse} : 400;
        }else{
            return 404;
        }
    }
}

module.exports = AssetsService;