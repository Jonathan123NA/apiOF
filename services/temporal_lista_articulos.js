const db = require('../db');

function getAlltemporalLA(req, res) {
    db.select().from('temporal_lista_articulos').then((rows) => {
        return res.status(200).json(rows);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener lista tempotal de articulos' });
    });
}

function gettemporalLAById(req, res) {
    const id = req.params.id;
    db.select().from('temporal_lista_articulos').where('idtemporal_lista_articulos', id).then((rows) => {
        if (rows.length === 0) {
            return res.status(404).json({ message: 'articulo en la lista temporal no encontrada' });
        }
        return res.status(200).json(rows[0]);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al obtener articulo en la lista temporal' });
    });
}

function createtemporalLA(req, res) {
    const cantidad = req.body;
    const id_articulo = req.body;
    const articulo = req.body;
    db.insert(cantidad, id_articulo, articulo).into('temporal_lista_articulos').then((result) => {
        console.log("temporal_lista_articulos");
        return res.status(200).json({ message: 'articulo añadido en la lista temporal!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al añadir articulo a la lista temporal' });
    });
}

function deletetemporalLA(req, res) {
    const id = req.params.id;
    db('temporal_lista_articulos').where('idtemporal_lista_articulos', id).del().then((count) => {
        if (count === 0) return res.status(404).send('articulo en la lista tempotal no encontrado');
        return res.json({ message: 'lista temporal de articulos eliminada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al eliminar articulo de la lista temporal' });
    });
}

function deletetemporalLAALL(req, res) {
    db('temporal_lista_articulos')
        .del()
        .then((count) => {
            if (count === 0) {
                return res.status(404).send('No se encontraron registros en la lista temporal');
            }
            return res.json({ message: 'Lista temporal de articulos eliminada!' });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: 'Error al eliminar registros de la lista temporal' });
        });
}


function updatetemporalLA(req, res) {
    const cantidad = req.body;
    const id = req.params.id;
    db('temporal_lista_articulos').where('idtemporal_lista_articulos', id).update(cantidad).then((count) => {
        if (count === 0) return res.status(404).send('Articulo de la lista temporal no encontrada');
        return res.json({ message: 'articulo en la lista temporal actualizada!' });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Error al actualizar articulo de la lista temporal' });
    });
}

module.exports = {
    getAlltemporalLA,
    gettemporalLAById,
    createtemporalLA,
    deletetemporalLA,
    deletetemporalLAALL,
    updatetemporalLA
};