const { body } = require('express-validator');

const validatePost = [
    body('name')
        .isString()
        .withMessage('This is a not valid name')
        .notEmpty()
        .withMessage('name is require')
        .isLength({min: 3, max: 50})
        .withMessage('name have a not valid length'),
    body('type')
        .isString()
        .withMessage('This is a not valid type')
        .notEmpty()
        .withMessage('type is require')
        .isLength({min: 3, max: 30})
        .withMessage('type have a not valid length'),
    body('code').optional()
        .isAlphanumeric()
        .withMessage('This is a not valid code')
        .isLength({min: 10, max: 25})
        .withMessage('code have a not valid length'),
    body('description')
        .isString()
        .withMessage('This is a not valid description')
        .isLength({max: 200})
        .withMessage('description have a not valid length'),
    body('purchase_date')
        .isDate()
        .withMessage('This is a not valid purchase_date')
        .notEmpty()
        .withMessage('purchase_date is require'),
    body('employee_id')
        .isNumeric()
        .withMessage('This is a not valid id')
        .notEmpty()
        .withMessage('employee_id is require')
        .isLength({max: 11})
        .withMessage('employee_id have a not valid length')
];

const validatePut = [
    body('name').optional()
        .isString()
        .withMessage('This is a not valid name')
        .notEmpty()
        .withMessage('name is require')
        .isLength({min: 3, max: 50})
        .withMessage('name have a not valid length'),
    body('type').optional()
        .isString()
        .withMessage('This is a not valid type')
        .notEmpty()
        .withMessage('type is require')
        .isLength({min: 3, max: 30})
        .withMessage('type have a not valid length'),
    body('code').optional()
        .isAlphanumeric()
        .withMessage('This is a not valid code')
        .isLength({min: 10, max: 25})
        .withMessage('code have a not valid length'),
    body('description').optional()
        .isString()
        .withMessage('This is a not valid description')
        .isLength({max: 200})
        .withMessage('description have a not valid length'),
    body('purchase_date').optional()
        .isDate()
        .withMessage('This is a not valid purchase_date')
        .notEmpty()
        .withMessage('purchase_date is require'),
    body('employee_id').optional()
        .isNumeric()
        .withMessage('This is a not valid id')
        .notEmpty()
        .withMessage('employee_id is require')
        .isLength({max: 11})
        .withMessage('employee_id have a not valid length'),
];


module.exports = {
    validatePost: validatePost,
    validatePut: validatePut
}