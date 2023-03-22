const employeeService = require('../services/empleoyee-service');
const EmployeeDTO = require('../dto/employee-dto');
const ErrorResponse = require('../dto/error-response');
const SuccessResponse = require('../dto/success-response');
const { validationResult } = require('express-validator');
const url = require('url');
const querystring = require('querystring');

const getAllEmployees = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);
        const serviceResponse = await employeeService.findAllEmployee(parsedQuery);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const getPaginatedEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const { items, page } = req.params;
        const PaginatedResponse = await employeeService.findPaginatedEmployees(items, page);
        if(PaginatedResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(PaginatedResponse));
        }
    } catch (error) {
        next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const { id } = req.params;
        const serviceResponse = await employeeService.findEmployeeById(id);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};
const createEmployee = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const employeeDTO = new EmployeeDTO(req.body);
        const serviceResponse = await employeeService.createEmployee(employeeDTO);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().CreatedMessage(serviceResponse));
        }
    } catch(error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const employeeDTO = new EmployeeDTO(req.body);
        const { id } = req.params;
        const serviceResponse = await employeeService.updateEmployee(employeeDTO, id);
        switch (serviceResponse){
            case 400:
                res.json(new ErrorResponse().BadRequestError());
                break;
            case 404:
                res.json(new ErrorResponse().notFoundError());
                break;
            default:
                res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()))
        }
        const { id } = req.params;
        const serviceResponse = await employeeService.deleteEmployee(id);
        if(serviceResponse === 404){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEmployees: getAllEmployees,
    getPaginatedEmployee: getPaginatedEmployee,
    getEmployeeById: getEmployeeById,
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee
}