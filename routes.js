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

// Rutas Usuarios
const serviceUsuarios = require('./services/usuariosService');
router.get('/usuarios/', serviceUsuarios.getAllUsers);
router.get('/usuarios/:id', serviceUsuarios.getUserById);
router.post('/usuarios/', serviceUsuarios.createUser);
router.delete('/usuarios/:id', serviceUsuarios.deleteUser);
router.put('/usuarios/:id', serviceUsuarios.updateUser);

module.exports = router;