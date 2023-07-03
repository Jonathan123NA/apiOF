const connection = require('../db');

function getAllTypeArticle(req, res) {
    connection.query('SELECT * FROM tipo_articulos', (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        res.json(rows);
    });
}

function getTypeArticleById(req, res) {
    const id = req.params.id;
    connection.query('SELECT * FROM tipo_articulos WHERE id = ?', id, (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(404).send('Tipo de articulo no encontrado');
        }

        res.json(rows[0]);
    });
}

function createTypeArticle(req, res) {
    const tipo = req.body;
    connection.query('INSERT INTO tipo_articulos SET ?', tipo, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Tipo de Articulo añadido!' });
    });
}

function deleteTypeArticle(req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM tipo_articulos WHERE id = ?', id, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Tipo de Articulo eliminado!' });
    });
}

function updateTypeArticle(req, res) {
    const id = req.params.id;
    const tipo = req.body;
    connection.query('UPDATE tipo_articulos SET ? WHERE id = ?', [tipo, id], (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Tipo de Articulo actualizado!' });
    });
}

module.exports = {
    getAllTypeArticle,
    getTypeArticleById,
    createTypeArticle,
    deleteTypeArticle,
    updateTypeArticle
};