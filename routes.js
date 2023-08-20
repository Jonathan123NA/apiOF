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
router.get('/nextIDOrden/', serviceOrdenes.getNextOrderId);

// Rutas Usuarios
const serviceUsuarios = require('./services/usuariosService');
router.get('/usuarios/', serviceUsuarios.getAllUsers);
router.get('/usuarios/:id', serviceUsuarios.getUserById);
router.get('/usuariosRol', serviceUsuarios.getUserByRol);
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
//Eliminar todos
router.delete('/temporalLAAL/', serviceTypeTempotal.deletetemporalLAALL);
router.put('/temporalLA/:id', serviceTypeTempotal.updatetemporalLA);

//Endpoint para verificar las credenciales del usuario
router.post('/verificar-credenciales', serviceUsuarios.verifyCredentials);

//Rutas para la relación entre ordenes y articulos
const serviceOrderArticles = require('./services/ordenArticulosService');
router.get('/orden_articulos/', serviceOrderArticles.getAllOrderArticles);
router.get('/orden_articulos/:idOrden/:idArticulo', serviceOrderArticles.getOrderArticleById);
router.post('/orden_articulos/', serviceOrderArticles.createOrderArticle);
router.delete('/orden_articulos/:idOrden/:idArticulo', serviceOrderArticles.deleteOrderArticle);
router.put('/orden_articulos/:idOrden/:idArticulo', serviceOrderArticles.updateOrderArticle);

// Rutas para la relación entre órdenes y usuarios
const serviceOrderUsers = require('./services/ordenUsuariosService');
router.get('/orden_usuarios', serviceOrderUsers.getAllOrderUsuarios);
//Por usuario
router.get('/orden_usuarios/:idUsuario', serviceOrderUsers.getAllOrderUsuarios);
router.get('/orden_usuarios/:idOrden/:idUsuario', serviceOrderUsers.getOrderUsuarioById);
router.post('/orden_usuarios', serviceOrderUsers.createOrderUsuario);
router.delete('/orden_usuarios/:idOrden/:idUsuario', serviceOrderUsers.deleteOrderUsuario);
router.put('/orden_usuarios/:idOrden/:idUsuario', serviceOrderUsers.updateOrderUsuario);

module.exports = router;