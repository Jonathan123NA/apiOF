const mysql = require('mysql');
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: 'ordenfacilsql.mysql.database.azure.com',
    user: 'ordenfacilsql',
    password: 'Polinesios2023.',
    database: 'ordenfacil',
  },
});

module.exports = db;