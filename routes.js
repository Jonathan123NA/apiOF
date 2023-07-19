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

//Rutas Tipo Articulo
const serviceTypeArticle = require('./services/tipoArticulosService');
router.get('/tipo_articulos/', serviceTypeArticle.getAllTypeArticle);
router.get('/tipo_articulos/:id', serviceTypeArticle.getTypeArticleById);
router.post('/tipo_articulos/', serviceTypeArticle.createTypeArticle);
router.delete('/tipo_articulos/:id', serviceTypeArticle.deleteTypeArticle);
router.put('/tipo_articulos/:id', serviceTypeArticle.updateTypeArticle);

//Rutas de lista temporal de articulos
const serviceTypeTempotal = require('./services/temporal_lista_articulos');
router.get('/temporalLA/', serviceTypeTempotal.getAlltemporalLA);
router.get('/temporalLA/:id', serviceTypeTempotal.gettemporalLAById);
router.post('/temporalLA/', serviceTypeTempotal.createtemporalLA);
router.delete('/temporalLA/:id', serviceTypeTempotal.deletetemporalLA);
router.put('/temporalLA/:id', serviceTypeTempotal.updatetemporalLA);

//Endpoint para verificar las credenciales del usuario
router.post('/verificar-credenciales', serviceUsuarios.verifyCredentials);

module.exports = router;