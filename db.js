// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   user: 'root',
//   host: '127.0.0.1',
//   database: 'sample',
//   password: '5Fa@123#',
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// module.exports = pool.promise();

// db setup for pg
const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sample',
  password: 'fazi5566',
  port: 5432,
})

module.exports = pool
