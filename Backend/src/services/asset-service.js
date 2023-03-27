const assetModel = require('../models/asset-model');
const employeeModel = require('../models/employee-model');
const queryAsset = require('../utils/createQuery/where-asset');
const completeAsset = require('../utils/merge/asset');

class AssetsService {
    static async findAllAssets (paramsQuery) {
        const countResponse = await assetModel.findTotalAssets();
        const { 'COUNT(*)': totalItems } = countResponse[0];
        const whereQuery = queryAsset(paramsQuery);
        const assetList = await assetModel.findAllAssets(whereQuery);
        return assetList.length > 0 ? {assetList, totalItems} : null;
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
        if(asset.employee_id){
            const findEmployeeResponse = await employeeModel.findEmployeeById(asset.employee_id);
            if(findEmployeeResponse.length === 0){
                return 404;
            }
        }
        const modelResponse = await assetModel.createAsset(asset);
        return modelResponse ? modelResponse : null;
    }

    static async updateAsset (asset, id) {
        const findAssetResponse = await this.findAssetById (id);
        if(findAssetResponse){
            if(asset.employee_id){
                const findEmployeeResponse = await employeeModel.findEmployeeById(asset.employee_id);
                if(findEmployeeResponse.length === 0){
                    return 404;
                }
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