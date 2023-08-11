const db = require('../db');

async function getAllOrderUsuarios(req, res) {
    await db.select().from('orden_usuarios').then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener las relaciones entre órdenes y usuarios' });
    });
}

async function getOrderUsuarioById(req, res) {
    const idOrden = req.params.idOrden;
    const idUsuario = req.params.idUsuario;
    await db.select().from('orden_usuarios').where('id_orden', idOrden).where('id_usuario', idUsuario).then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ message: 'Relación entre orden y usuario no encontrada' });
        }
        return res.status(200).json(data[0]);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener la relación entre orden y usuario' });
    });
}

async function createOrderUsuario(req, res) {
    const { id_orden, id_usuario } = req.body;
    await db.insert({ id_orden, id_usuario }).into('orden_usuarios').then(() => {
        return res.status(200).json({ message: 'Relación entre orden y usuario añadida!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir la relación entre orden y usuario, asegúrate de que existan la orden y el usuario' });
    });
}

async function deleteOrderUsuario(req, res) {
    const idOrden = req.params.idOrden;
    const idUsuario = req.params.idUsuario;
    await db('orden_usuarios').where('id_orden', idOrden).where('id_usuario', idUsuario).del().then((count) => {
        if (count === 0) {
            return res.status(404).send('Relación entre orden y usuario no encontrada');
        }
        return res.status(200).json({ message: 'Relación entre orden y usuario eliminada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar la relación entre orden y usuario' });
    });
}

async function updateOrderUsuario(req, res) {
    const idOrden = req.params.idOrden;
    const idUsuario = req.params.idUsuario;
    const { id_orden, id_usuario } = req.body;
    await db('orden_usuarios').where('id_orden', idOrden).where('id_usuario', idUsuario).update({ id_orden, id_usuario }).then((count) => {
        if (count === 0) {
            return res.status(404).send('Relación entre orden y usuario no encontrada');
        }
        return res.status(200).json({ message: 'Relación entre orden y usuario actualizada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar la relación entre orden y usuario' });
    });
}

module.exports = {
    getAllOrderUsuarios,
    getOrderUsuarioById,
    createOrderUsuario,
    deleteOrderUsuario,
    updateOrderUsuario
};
