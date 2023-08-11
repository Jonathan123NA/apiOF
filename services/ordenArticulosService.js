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
        return res.status(500).json({ message: 'Error al obtener la relación entre la orden y el artículo' });
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
          return res.status(404).json({ message: 'Relación entre orden y artículo no encontrada' });
        }
        return res.status(200).json(data[0]);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener la relación entre la orden y el artículo' });
      });
}

function createOrderArticle(req, res) {
    const orderArticle = req.body;
    db.insert(orderArticle).into('orden_articulos')
      .then(() => {
        return res.status(200).json({ message: 'Relación entre orden y artículo añadida!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir la relación entre la orden y el artículo' });
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
          return res.status(404).send('Relación entre orden y artículo no encontrado');
        }
        return res.status(200).json({ message: 'Relación entre orden y artículo eliminado!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar la relación entre la orden y el artículo' });
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
          return res.status(404).send('Relación entre orden y artículo no encontrada');
        }
        return res.status(200).json({ message: 'Relación entre orden y artículo actualizada!' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar la relación entre la orden y el artículo' });
      });
}

module.exports = {
    getAllOrderArticles,
    getOrderArticleById,
    createOrderArticle,
    deleteOrderArticle,
    updateOrderArticle
};
