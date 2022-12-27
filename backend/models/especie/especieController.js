const express = require('express');
const especieModel = require ('./especieModel');

const { Response } = require('../../response.js');


const createError = require('http-errors');

const router = express.Router();

//getAll
router.get('/', async(req, res) => {
    try {
        let especies = await especieModel.find().populate('monstruos');
        Response.success(res, 200, 'Listado de especies', especies);
    } catch (error) {
        console.log(error)
    }
});

//create
router.post('/', async(req, res) => {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length == 0){
            Response.error(res, new createError.BadRequest());
        }
        else{
            const especie = especieModel(req.body);
            await especie.save();
            Response.success(res,201,'especie agregada correctamente',especie);
        }
    } catch (error) {
        Response.error(res);
    }
});

//getById
/*
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        let especie = await especieModel.findById(id).populate('monstruos');
        if(!especie){
            Response.error(res,new createError.NotFound());
        }
        else{
            Response.success(res, 200, `Especie: ${id} , identificada`, especie)
        }
    } catch (error) {
        Response.error(res)
    }
});
*/


//update
router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, detalle, monstruos} = req.body;
        let especie = await especieModel.updateOne({_id: id}, {$set: {nombre, detalle, monstruos}});
    } catch (error) {
        Response.error(error)
    }
});

//delete
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        let monstruo = await especieModel.deleteOne({_id: id});
        Response.success(res, 200, 'Especie eliminada del bestiario: ', monstruo);
    } catch (error) {
        Response.error(error);
    }
});

//getMonstruosByEspecie
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        let body = await especieModel.findById(id, {"_id":0,"nombre":0,"detalle":0}).populate('monstruos');
        let monstruos = body.monstruos
        if(!monstruos){
            Response.error(res,new createError.NotFound());
        }
        else{
            Response.success(res, 200, `Especie: ${id} , identificada`, monstruos)
        }
    } catch (error) {
        Response.error(res)
    }
});

module.exports = router;
