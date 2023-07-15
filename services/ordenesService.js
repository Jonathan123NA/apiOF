const db = require('../db');

function getAllOrden(req, res) {
    db.select().from('ordenes').then((rows) => {
        return res.status(200).json(rows);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener las ordenes' });
    });
}

function getOrdenById(req, res) {
    const id = req.params.id;
    db.select().from('ordenes').where('id', id).then((rows) => {
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        return res.status(200).json(rows[0]);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener la orden' });
    });
}

function createOrden(req, res) {
    const fecha_inicio = req.body;
    const fecha_fin = req.body;
    const estado = req.body;
    const descripcion = req.body;
    db.insert(fecha_inicio, fecha_fin, estado, descripcion).into('ordenes').then((result) => {
        return res.status(200).json({ message: 'Orden añadida!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir la orden' });
    });
}

function deleteOrden(req, res) {
    const id = req.params.id;
    db('ordenes').where('id', id).del().then((count) => {
        if (count === 0) return res.status(404).send('Orden no encontrada');
        return res.json({ message: 'Orden eliminada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar la orden' });
    });
}

function updateOrden(req, res) {
    const fecha_fin = req.body;
    const estado = req.body.estado;
    const descripcion = req.body.descripcion;
    const id = req.params.id;
    db('ordenes').where('id', id).update(fecha_fin, estado, descripcion).then((count) => {
        if (count === 0) return res.status(404).send('Orden no encontrada');
        return res.json({ message: 'Orden actualizada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar la orden' });
    });
}

module.exports = {
    getAllOrden,
    getOrdenById,
    createOrden,
    deleteOrden,
    updateOrden
};