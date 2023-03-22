const express = require('express');
const employeeRoutes = require('./employee-routes');
const assetsRoutes = require('./asset-routes');

//creacion del router principal
const rootRouter = express.Router();

//Asigacion de paths para cada ruta del router principal
rootRouter.use('/employees', employeeRoutes);
rootRouter.use('/assets', assetsRoutes);

module.exports = rootRouter;