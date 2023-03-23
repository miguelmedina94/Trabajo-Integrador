const assetsService = require('../services/asset-service');
const AssetDTO = require('../dto/asset-dto');
const ErrorResponse = require('../dto/error-response');
const SuccessResponse = require('../dto/success-response');
const { validationResult } = require('express-validator');
const url = require('url');
const querystring = require('querystring');

const getAllAssets = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);
        const serviceResponse = await assetsService.findAllAssets(parsedQuery);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const getAssetById = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const { id } = req.params ;
        const serviceResponse = await assetsService.findAssetById(id);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const getAssetsByEmployeeId = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const { id } = req.params ;
        const serviceResponse = await assetsService.findAssetByEmployeeId(id);
        if(serviceResponse === null){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const createAsset = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const assetDTO = new AssetDTO(req.body);
        const serviceResponse = await assetsService.createAsset(assetDTO);
        if (serviceResponse === 404){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const updateAsset = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const assetDTO = new AssetDTO(req.body);
        const { id } = req.params;
        const serviceResponse = await assetsService.updateAsset(assetDTO, id);
        if (serviceResponse === 404){
            res.json(new ErrorResponse().notFoundError());
        }else{
            res.json(new SuccessResponse().OkMessage(serviceResponse));
        }
    } catch (error) {
        next(error);
    }
};

const deleteAsset = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json(new ErrorResponse().BadRequestError(errors.array()));
        }
        const { id } = req.params;
        const serviceResponse = await assetsService.deleteAsset(id);
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
    getAllAssets,
    getAssetById,
    getAssetsByEmployeeId,
    createAsset,
    updateAsset,
    deleteAsset
};