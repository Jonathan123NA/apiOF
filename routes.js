const express = require('express');

const router = express.Router();

const serviceArticulos = require('./services/articulosService');

router.get('/', serviceArticulos.getAllArticles);
router.get('/:id', serviceArticulos.getArticleById);
router.post('/', serviceArticulos.createArticle);
router.delete('/:id', serviceArticulos.deleteArticle);
router.put('/:id', serviceArticulos.updateArticle);

module.exports = router;