const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'learn-node',
  password: 'Q!w2e3r4'
});

module.exports = pool.promise();
