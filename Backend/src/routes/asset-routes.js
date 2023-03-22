const express = require('express');
const assetsController = require('../controllers/asset-controller');
const { validatePost, validatePut } = require('../utils/validate/assets');
const { validateId } = require('../utils/validate/params');
const { validatePagination, validateFilterAsset } = require('../utils/validate/query');

//creacion del router de empleados
const assetsRoutes = express.Router();

//Asigacion de paths para cada ruta del router de empleados
assetsRoutes
    .route('/')
    .get(validatePagination, validateFilterAsset, assetsController.getAllAssets)
    .post(validatePost, assetsController.createAsset);

assetsRoutes
    .route('/:id')
    .get(validateId, assetsController.getAssetById)
    .put(validatePut, validateId, assetsController.updateAsset)
    .delete(validateId, assetsController.deleteAsset);

assetsRoutes
    .route('/employeeId/:id')
    .get(validateId, assetsController.getAssetsByEmployeeId);

module.exports = assetsRoutes;