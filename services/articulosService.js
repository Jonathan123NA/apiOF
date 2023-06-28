const connection = require('../db');

function getAllArticles(req, res) {
    connection.query('SELECT * FROM articulos', (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        res.json(rows);
    });
}

function getArticleById(req, res) {
    const id = req.params.id;
    connection.query('SELECT * FROM articulos WHERE id = ?', id, (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(404).send('Articulo no encontrado');
        }

        res.json(rows[0]);
    });
}

function createArticle(req, res) {
    const articulo = req.body;
    connection.query('INSERT INTO articulos SET ?', articulo, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Articulo añadido!' });
    });
}

function deleteArticle(req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM articulos WHERE id = ?', id, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Articulo eliminado!' });
    });
}

function updateArticle(req, res) {
    const id = req.params.id;
    const articulo = req.body;
    connection.query('UPDATE articulos SET ? WHERE id = ?', [articulo, id], (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Articulo actualizado!' });
    });
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    deleteArticle,
    updateArticle
};