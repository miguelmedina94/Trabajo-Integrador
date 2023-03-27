const employeeModel = require('../models/employee-model');
const assetModel = require('../models/asset-model');
const completeEmployee = require('../utils/merge/employee');
const queryEmployee = require('../utils/createQuery/where-employee');

class EmployeeService {
    static async findAllEmployee (paramsQuery) {
        const countResponse = await employeeModel.findTotalEmployees();
        const { 'COUNT(*)': totalItems } = countResponse[0];
        const whereQuery = queryEmployee(paramsQuery);
        const employeeList = await employeeModel.findAllEmployee(whereQuery);
        return employeeList.length > 0 ? {employeeList, totalItems}: null;
    }

    static async findEmployeeById (id) {
        const modelResponse = await employeeModel.findEmployeeById(id);
        return modelResponse.length > 0 ? modelResponse[0] : null;
    }

    static async createEmployee (employee) {
        const modelResponse = await employeeModel.createEmployee(employee);
        return modelResponse ? modelResponse : null;
    }

    static async updateEmployee (employee, id) {
        const findResponse = await this.findEmployeeById (id);
        if(findResponse){
            const updatedEmployee = completeEmployee(employee,findResponse);
            const updateResponse = await employeeModel.updateEmployee(updatedEmployee,id);
            return updateResponse ? {afectedRows: updateResponse, idUpdated: updatedEmployee.id} : 400;
        }else{
            return 404;
        }
    }

    static async deleteEmployee (id) {
        const findResponse = await this.findEmployeeById (id);
        if(findResponse){
            const gralResponse = {};
            const deleteAssetsResponse = await assetModel.unlinkAssetByEmployeeId(id);
            gralResponse.AssetsAfectedRows = deleteAssetsResponse;
            const deleteEmployeeResponse = await employeeModel.deleteEmployee(id);
            gralResponse.EmployeeAfectedRows = deleteEmployeeResponse;
            return deleteAssetsResponse || deleteEmployeeResponse ? gralResponse : 400;
        }else{
            return 404;
        }
    }
}

module.exports = EmployeeService;