const connection = require('../db');

function getAllPersons(req, res) {
    connection.query('SELECT * FROM personas', (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        res.json(rows);
    });
}

function getPersonById(req, res) {
    const id = req.params.id;
    connection.query('SELECT * FROM personas WHERE id = ?', id, (err, rows) => {
        if (err) 
            return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(404).send('Persona no encontrada');
        }

        res.json(rows[0]);
    });
}

function createPerson(req, res) {
    const { id, nombres, apellidos, telefono } = req.body;
    const persona = { id, nombres, apellidos, telefono };
    connection.query('INSERT INTO personas SET ?', persona, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Persona añadida!' });
    });
}

function deletePerson(req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM personas WHERE id = ?', id, (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Persona eliminada!' });
    });
}

function updatePerson(req, res) {
    const id = req.params.id;
    const { nombres, apellidos, telefono } = req.body;
    const persona = { nombres, apellidos, telefono };
    connection.query('UPDATE personas SET ? WHERE id = ?', [persona, id], (err, result) => {
        if (err) 
            return res.status(500).send(err);

        res.json({ message: 'Persona actualizada!' });
    });
}

module.exports = {
    getAllPersons,
    getPersonById,
    createPerson,
    deletePerson,
    updatePerson
};
