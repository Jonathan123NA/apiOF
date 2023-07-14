const db = require('../db');
const connection = db.connection;


function getAllArticles(req, res) {
    db.db
    .select('a.id', 'a.nombre', 'a.descripcion', 'a.cantidad', 't.tipo')
    .select(db.db.raw("IF(a.estado = 1, 'Activo', 'Inactivo') AS estado"))
    .from('articulos as a')
    .join('tipo_articulos as t', 'a.id_tipo', 't.id').then((data) => {
        console.log(data);
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Error al obtener los articulos', err: err });
    });
}

function getArticleById(req, res) {
    const id = req.params.id;
    db.db
    .select('a.id', 'a.nombre', 'a.descripcion', 'a.cantidad', 't.tipo')
    .select(db.db.raw("IF(a.estado = 1, 'Activo', 'Inactivo') AS estado"))
    .from('articulos as a')
    .join('tipo_articulos as t', 'a.id_tipo', 't.id')
    .where('id', id)
    .then((data) => {
        return res.status(200).json(data[0]);
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Error al obtener el articulo' });
    });
}

function createArticle(req, res) {
    const articulo = req.body;
    db.db.insert(articulo).into('articulos').then((data) => {
        return res.status(200).json({ message: 'Articulo creado correctamente' });
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Error al crear el articulo' });
    });
}

function deleteArticle(req, res) {
    const id = req.params.id;
    db.db('articulos').where('id', id).del().then((count) => {
        if(count == 0) return res.status(404).json({ message: 'Articulo no encontrado' });
        return res.status(200).json({ message: 'Articulo eliminado correctamente' });
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Error al eliminar el articulo' });
    });
}

function updateArticle(req, res) {
    const id = req.params.id;
    const articulo = req.body;
    db.db('articulos').where('id', id).update(articulo).then((count) => {
        if(count == 0) return res.status(404).json({ message: 'Articulo no encontrado' });
        return res.status(200).json({ message: 'Articulo actualizado correctamente' });
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Error al actualizar el articulo' });
    });
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    deleteArticle,
    updateArticle
};