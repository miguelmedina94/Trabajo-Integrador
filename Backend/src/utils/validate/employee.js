const { body } = require('express-validator');

const validatePost = [
    body('first_name')
        .isString()
        .withMessage('This is a not valid first_name')
        .notEmpty()
        .withMessage('first_name is require')
        .isLength({min: 3, max: 50})
        .withMessage('first_name have a not valid length'),
    body('last_name')
        .isString()
        .withMessage('This is a not valid last_name')
        .notEmpty()
        .withMessage('last_name is require')
        .isLength({min: 3, max: 50})
        .withMessage('last_name have a not valid length'),
    body('cuit')
        .isNumeric()
        .withMessage('This is a not valid cuit')
        .notEmpty()
        .withMessage('cuit is require')
        .isLength({min: 11, max: 11})
        .withMessage('cuit have a not valid length'),
    body('team_id').optional()
        .isNumeric()
        .withMessage('This is a not valid team_id'),
    body('join_date')
        .isDate()
        .withMessage('This is a not valid date')
        .notEmpty()
        .withMessage('join_date is require'),
    body('rol')
        .isString()
        .withMessage('This is a not valid rol')
        .notEmpty()
        .withMessage('rol is require')
        .isLength({min: 3, max: 50})
        .withMessage('rol have a not valid length'),
];

const validatePut = [
    body('first_name').optional()
        .isString()
        .withMessage('This is a not valid first_name')
        .notEmpty()
        .withMessage('first_name is require')
        .isLength({min: 3, max: 50})
        .withMessage('first_name have a not valid length'),
    body('last_name').optional()
        .isString()
        .withMessage('This is a not valid last_name')
        .notEmpty()
        .withMessage('last_name is require')
        .isLength({min: 3, max: 50})
        .withMessage('last_name have a not valid length'),
    body('cuit').optional()
        .isNumeric()
        .withMessage('This is a not valid cuit')
        .notEmpty()
        .withMessage('cuit is require')
        .isLength({min: 11, max: 11})
        .withMessage('cuit have a not valid length'),
    body('team_id').optional()
        .isNumeric()
        .withMessage('This is a not valid team_id'),
    body('join_date').optional()
        .isDate()
        .withMessage('This is a not valid date')
        .notEmpty()
        .withMessage('join_date is require'),
    body('rol').optional()
        .isString()
        .withMessage('This is a not valid rol')
        .notEmpty()
        .withMessage('rol is require')
        .isLength({min: 3, max: 50})
        .withMessage('rol have a not valid length'),
];

module.exports = {
    validatePost: validatePost,
    validatePut: validatePut,
}