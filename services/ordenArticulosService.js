const db = require('../db');

function getAllOrderArticles(req, res) {
    db.select('oa.id_orden', 'oa.id_articulo')
      .from('orden_articulos as oa')
      .then((data) => {
        console.log(data); // Agrega este console.log para verificar los datos
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener los articulos de la orden' });
      });
}

function getOrderArticleById(req, res) {
    const idOrden = req.params.idOrden;
    const idArticulo = req.params.idArticulo;
    db.select('oa.id_orden', 'oa.id_articulo')
      .from('orden_articulos as oa')
      .where('oa.id_orden', idOrden)
      .where('oa.id_articulo', idArticulo)
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({ message: 'Articulo de la orden no encontrado' });
        }
        return res.status(200).json(data[0]);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener el articulo de la orden' });
      });
}

function createOrderArticle(req, res) {
    const orderArticle = req.body;
    db.insert(orderArticle).into('orden_articulos')
      .then(() => {
        return res.status(200).json({ message: 'Articulo de la orden añadido!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir el articulo de la orden, asegurate de que primero exista el artículo' });
      }); 
}

function deleteOrderArticle(req, res) {
    const idOrden = req.params.idOrden;
    const idArticulo = req.params.idArticulo;
    db('orden_articulos')
      .where('id_orden', idOrden)
      .where('id_articulo', idArticulo)
      .del()
      .then((count) => {
        if (count === 0) {
          return res.status(404).send('Articulo u orden no encontrado');
        }
        return res.status(200).json({ message: 'Articulo de la orden eliminado!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar el articulo de la orden, asegurese de que el artículo exista' });
      });
}

function updateOrderArticle(req, res) {
    const idOrden = req.params.idOrden;
    const idArticulo = req.params.idArticulo;
    const orderArticle = req.body;
    db('orden_articulos')
      .where('id_orden', idOrden)
      .where('id_articulo', idArticulo)
      .update(orderArticle)
      .then((count) => {
        if (count === 0) {
          return res.status(404).send('Articulo de la orden no encontrado');
        }
        return res.status(200).json({ message: 'Articulo de la orden actualizado!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el articulo de la orden, asegurese de que el artículo exista' });
      });
}

module.exports = {
    getAllOrderArticles,
    getOrderArticleById,
    createOrderArticle,
    deleteOrderArticle,
    updateOrderArticle
};
