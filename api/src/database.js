const mysql = require('mysql')

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} = process.env

const appsQuery = `
SELECT
  apps.id,
  apps.color,
  apps.icon_url AS iconUrl,
  apps.name,
  apps.url,
  GROUP_CONCAT(tags.id) AS tag_ids
FROM apps
LEFT JOIN app_tags ON apps.id = app_tags.app_id
LEFT JOIN tags ON app_tags.tag_id = tags.id
GROUP BY id
ORDER BY RAND()
`

const tagsQuery = 'SELECT * FROM tags'

const runQuery = query => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  })

  connection.connect()

  connection.query(query, (error, results) => {
    if (error) reject(error)
    else resolve(results)
  })

  connection.end()
})

module.exports.getApps = () => runQuery(appsQuery)

module.exports.getTags = () => runQuery(tagsQuery)
