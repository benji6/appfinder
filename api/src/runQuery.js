const mysql = require('mysql')

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} = process.env

module.exports = (...args) => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    user: MYSQL_USER,
  })

  connection.connect()

  connection.query(...args, (error, results) => {
    if (error) reject(error)
    else resolve(results)
  })

  connection.end()
})
