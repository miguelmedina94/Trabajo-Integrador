const { query } = require('express-validator');

const validatePagination = [
    query('items').optional()
        .isNumeric()
        .withMessage('This is a not valid item param')
        .isInt({min: 3})
        .withMessage('This is a not valid item param')
        .notEmpty()
        .withMessage('id is require'),
    query('page').optional()
        .if(query('items').exists())
        .isNumeric()
        .withMessage('This is a not valid page param')
        .isInt({min: 1})
        .withMessage('This is a not valid item param')
        .notEmpty()
        .withMessage('id is require')
];

const validateFilterEmployee = [
    query('first_name').optional()
        .isString()
        .withMessage('This is a not valid first_name')
        .notEmpty()
        .withMessage('first_name cannot be empty'),
    query('last_name').optional()
        .isString()
        .withMessage('This is a not valid last_name')
        .notEmpty()
        .withMessage('last_name cannot be empty'),
    query('cuit').optional()
        .isNumeric()
        .withMessage('This is a not valid cuit')
        .notEmpty()
        .withMessage('cuit cannot be empty'),
    query('team_id').optional()
        .isNumeric()
        .withMessage('This is a not valid team_id')
        .notEmpty()
        .withMessage('team_id cannot be empty'),
    query('join_date').optional()
        .isDate()
        .withMessage('This is a not valid date')
        .notEmpty()
        .withMessage('join_date cannot be empty'),
    query('rol').optional()
        .isString()
        .withMessage('This is a not valid rol')
        .notEmpty()
        .withMessage('rol cannot be empty')
];

const validateFilterAsset = [
    query('name').optional()
        .isString()
        .withMessage('This is a not valid name')
        .notEmpty()
        .withMessage('name cannot be empty'),
    query('type').optional()
        .isString()
        .withMessage('This is a not valid type')
        .notEmpty()
        .withMessage('type cannot be empty'),
    query('code').optional()
        .isAlphanumeric()
        .withMessage('This is a not valid code')
        .notEmpty()
        .withMessage('code cannot be empty'),
    query('description')
        .isString().optional()
        .withMessage('This is a not valid description')
        .notEmpty()
        .withMessage('description cannot be empty'),
    query('purchase_date').optional()
        .isDate()
        .withMessage('This is a not valid purchase_date')
        .notEmpty()
        .withMessage('purchase_date cannot be empty'),
    query('employee_id').optional()
        .isNumeric()
        .withMessage('This is a not valid id')
        .notEmpty()
        .withMessage('employee_id cannot be empty')
];


module.exports = {
    validatePagination: validatePagination,
    validateFilterEmployee: validateFilterEmployee,
    validateFilterAsset: validateFilterAsset
}