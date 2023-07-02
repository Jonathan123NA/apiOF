const connection = require('../db');

function getAllOrden(req, res) {
    connection.query('SELECT * FROM ordenes', (err, rows) => {
        if (err) 
            res.json({ message: 'Error en consulta' });

        res.json(rows);
    });
}


function getOrdenById(req, res) {
    console.log("Ordenes por id");
    const id = req.params.id;
    connection.query('SELECT * FROM ordenes WHERE id = ?', id, (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(404).send('Orden no encontrada');
        }

        res.json(rows[0]);
    });
}

function createOrden(req, res) {
    const fecha_inicio = req.body;
    const fecha_fin = req.body;
    const estado = req.body;
    const descripcion = req.body;
    connection.query('INSERT INTO ordenes SET ?', [ fecha_inicio, fecha_fin, estado, descripcion ] ,(err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Orden añadida!' });
    });
}

function deleteOrden(req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM ordenes WHERE id = ?', id, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Orden eliminada!' });
    });
}

function updateOrden(req, res) {
    const fecha_fin = req.body;
    const estado = req.body.estado;
    const descripcion = req.body.descripcion;
    const id = req.params.id;
    connection.query('UPDATE ordenes SET fecha_fin = ?, estado = ?, descripcion = ? WHERE id = ?', [fecha_fin, estado, descripcion, id], (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Orden actualizada!' });
    });
}

module.exports = {
    getAllOrden,
    getOrdenById,
    createOrden,
    deleteOrden,
    updateOrden
};