const db = require('../db');

function getAllTypeArticle(req, res) {
    db.select().from('tipo_articulos').then((rows) => {
        return res.status(200).json(rows);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener los tipos de articulos' });
    });
}

function getTypeArticleById(req, res) {
    const id = req.params.id;
    db.select().from('tipo_articulos').where('id', id).then((rows) => {
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tipo de articulo no encontrado' });
        }
        return res.status(200).json(rows[0]);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener el tipo de articulo' });
    });
}

function createTypeArticle(req, res) {
    const tipo = req.body;
    db.insert(tipo).into('tipo_articulos').then((result) => {
        return res.status(200).json({ message: 'Tipo de Articulo añadido!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir el tipo de articulo' });
    }); 
}

function deleteTypeArticle(req, res) {
    const id = req.params.id;
    db('articulos').where('id_tipo_articulo', id).del().then((count) => {
        if (count === 0) {
            return res.status(404).send('Tipo de articulo no encontrado');
        }
        return res.status(200).json({ message: 'Tipo de Articulo eliminado!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar el tipo de articulo' });
    });
}

function updateTypeArticle(req, res) {
    const id = req.params.id;
    const tipo = req.body;
    db('tipo_articulos').where('id', id).update(tipo).then((count) => {
        if (count === 0) {
            return res.status(404).send('Tipo de articulo no encontrado');
        }
        return res.status(200).json({ message: 'Tipo de Articulo actualizado!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar el tipo de articulo' });
    });
}

module.exports = {
    getAllTypeArticle,
    getTypeArticleById,
    createTypeArticle,
    deleteTypeArticle,
    updateTypeArticle
};