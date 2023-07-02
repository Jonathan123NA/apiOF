const mysql = require('mysql');
const knex = require('knex');

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

const db = knex({
  client: 'mysql',
  connection: {
    host: 'ordenfacilsql.mysql.database.azure.com',
    user: 'ordenfacilsql',
    password: 'Polinesios2023.',
    database: 'ordenfacil',
  },
});

module.exports = {
    connection,
    db
};