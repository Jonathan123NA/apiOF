const express = require('express');

const router = express.Router();

const serviceArticulos = require('./services/articulosService');

router.get('/articulos/', serviceArticulos.getAllArticles);
router.get('/articulos/:id', serviceArticulos.getArticleById);
router.post('/articulos/', serviceArticulos.createArticle);
router.delete('/articulos/:id', serviceArticulos.deleteArticle);
router.put('/articulos/:id', serviceArticulos.updateArticle);

//Rutas Ordenes
const serviceOrdenes = require('./services/ordenesService');
router.get('/consultasOrdenes/', serviceOrdenes.getAllOrden);
router.get('/consultaOrden/:id', serviceOrdenes.getOrdenById);
router.post('/creacionOrden/', serviceOrdenes.createOrden);
router.delete('/eliminacionOrden/:id', serviceOrdenes.deleteOrden);
router.put('/actualizacionOrden/:id', serviceOrdenes.updateOrden);

//Rutas Personas
const servicePersonas = require('./services/personasService');
router.get('/personas/', servicePersonas.getAllPersons);
router.get('/personas/:id', servicePersonas.getPersonById);
router.post('/personas/', servicePersonas.createPerson);
router.delete('/personas/:id', servicePersonas.deletePerson);
router.put('/personas/:id', servicePersonas.updatePerson);

module.exports = router;