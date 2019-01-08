const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'shop-node-app',
  password: 'admin'
});

module.exports = pool.promise();