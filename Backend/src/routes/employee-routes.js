const express = require('express');
const employeeController = require('../controllers/employee-controller');
const {validatePost,validatePut} = require('../utils/validate/employee');
const { validateId } = require('../utils/validate/params');
const { validatePagination, validateFilterEmployee } = require('../utils/validate/query');

//creacion del router de empleados
const employeeRoutes = express.Router();

//Asigacion de paths y middleware para cada ruta del router de empleados
employeeRoutes
    .route('/')
    .get(validatePagination, validateFilterEmployee, employeeController.getAllEmployees)
    .post(validatePost, employeeController.createEmployee);
    
employeeRoutes
    .route('/:id')
    .get(validateId, employeeController.getEmployeeById)
    .put(validatePut, validateId, employeeController.updateEmployee)
    .delete(validateId, employeeController.deleteEmployee);

module.exports = employeeRoutes;