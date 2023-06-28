const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ordenfacil',
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
    } else {
        console.log('Base de datos conectada');
    }
});

module.exports = connection;