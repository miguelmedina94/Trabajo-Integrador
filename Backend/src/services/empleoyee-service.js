const employeeModel = require('../models/employee-model');
const assetModel = require('../models/asset-model');
const completeEmployee = require('../utils/merge/employee');
const queryEmployee = require('../utils/createQuery/where-employee');

class EmployeeService {
    static async findAllEmployee (paramsQuery) {
        const whereQuery = queryEmployee(paramsQuery);
        const modelResponse = await employeeModel.findAllEmployee(whereQuery);
        return modelResponse.length > 0 ? modelResponse : null;
    }

    static async findPaginatedEmployees (items, page) {
        const allEmployeesResponse = await this.findAllEmployee();
        if(allEmployeesResponse.length <= items){
            return allEmployeesResponse;
        }
        let offset;
        if(page === 1){
            offset = 0;
        }else{
            offset = (page-1)*items;
        }
        const modelResponse = await employeeModel.findPaginatedEmployees(items, offset);
        return modelResponse.length > 0 ? modelResponse : null;
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
            return updateResponse ? {afectedRows: updateResponse} : 400;
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