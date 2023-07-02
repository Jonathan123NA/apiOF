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

module.exports = router;