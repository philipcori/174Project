/*
* Description: Connects to instance of the MySQL database
*/

const mysql = require('mysql');

function getConnetion() {
  const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'whoW4I9YXj',
    password: '8iSpLZ5qlA',
    database: 'whoW4I9YXj'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log("New MySQL connection")
  });
  return connection
}

module.exports.getConnetion = getConnetion;