const { param } = require('express-validator');

const validateId = [
    param('id')
        .isNumeric()
        .withMessage('This is a not valid id param')
        .notEmpty()
        .withMessage('id is require')
];

module.exports = {
    validateId
}