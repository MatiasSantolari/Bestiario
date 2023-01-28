const express = require('express');
const monstruoModel = require ('./monstruoModel');
const especieModel = require ('../especie/especieModel')

const { Response } = require('../../response.js');


const createError = require('http-errors');

const router = express.Router();

//getAll
router.get('/', async(req, res) => {
    try {
        let monstruos = await monstruoModel.find().populate('especie');
        Response.success(res, 200, 'Listado de monstruos', monstruos);
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
            const monster = monstruoModel(req.body);
            await monster.save();
            Response.success(res,201,'monstruo agregado correctamente',monster);
        }
    } catch (error) {
        Response.error(res);
    }
});

//getById
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        let monstruo = await monstruoModel.findById(id);
        if(!monstruo){
            Response.error(res,new createError.NotFound());
        }
        else{
            Response.success(res, 200, `Monstruo: ${id} , identificado`, monstruo)
        }
    } catch (error) {
        Response.error(res)
    }
});

//getByEstado
router.get('/monstruoEstado/:estado', async(req, res) => {
    try {
        const { estado } = req.params;
        let monstruos = await monstruoModel.find({estado: estado});

        if(!monstruos){
            Response.error(res, new createError.NotFound());
        }
        else{
            Response.success(res, 200, `Estado: ${estado}`, monstruos);
        }
    } catch (error) {
        Response.error(res)
    }
});
//getByEspecie
router.get('/monstruoByEspecie/:nombre', async(req, res) => {
    try {
        const { nombre } = req.params;
        let docEspecie = await especieModel.findOne({ nombre: nombre });
        let monstruos = await monstruoModel.find({ especie: docEspecie._id });
        if(!monstruos){
            Response.error(res, new createError.NotFound());
        }
        else{
            Response.success(res, 200, `Monstruos: `, monstruos);
        }
    } catch (error) {
        Response.error(res)
    }
});

//update
router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, nivelAmenaza, estado, detalle, nombresAlternativos, urlImagen, especie } = req.body;
        let monstruo = await monstruoModel.updateOne({_id: id}, {$set: {nombre, nivelAmenaza, estado, detalle, nombresAlternativos, urlImagen, especie}});
    } catch (error) {
        Response.error(error)
    }
});

//delete
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await monstruoModel.deleteOne({_id: id});
        Response.success(res, 200, 'Monstruo eliminado del bestiario');
    } catch (error) {
        Response.error(error);
    }
});

module.exports = router;
