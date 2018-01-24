const mysql = require('mysql')

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} = process.env

module.exports = (...args) => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  })

  connection.connect()

  connection.query(...args, (error, results) => {
    if (error) reject(error)
    else resolve(results)
  })

  connection.end()
})
