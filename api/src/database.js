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
  GROUP_CONCAT(categories.id) AS category_ids
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
GROUP BY id
ORDER BY RAND()
`

const appsQueryWithCategoriesFilter = `
SELECT
  apps.id,
  apps.color,
  apps.icon_url AS iconUrl,
  apps.name,
  apps.url,
  GROUP_CONCAT(categories.id) AS category_ids
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
WHERE categories.name IN (?)
GROUP BY id
ORDER BY RAND()
`

const appsQueryWithQuery = query => `
SELECT
  apps.id,
  apps.color,
  apps.icon_url AS iconUrl,
  apps.name,
  apps.url,
  GROUP_CONCAT(categories.id) AS category_ids
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
WHERE apps.name LIKE ${query}
OR categories.name LIKE ${query}
GROUP BY id
ORDER BY RAND()
`

const appsQueryWithQueryAndCategoriesFilter = query => `
SELECT
  apps.id,
  apps.color,
  apps.icon_url AS iconUrl,
  apps.name,
  apps.url,
  GROUP_CONCAT(categories.id) AS category_ids
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
WHERE categories.name IN (?)
AND (
  apps.name LIKE ${query}
  OR categories.name LIKE ${query}
)
GROUP BY id
ORDER BY RAND()
`

const categoriesQuery = 'SELECT * FROM categories ORDER BY name'

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

module.exports.getApps = ({query, categories}) => {
  if (query) {
    const escapedQuery = mysql.escape(`%${query}%`)
    if (categories.length) {
      return runQuery(mysql.format(appsQueryWithQueryAndCategoriesFilter(escapedQuery), [categories]))
    }
    return runQuery(appsQueryWithQuery(escapedQuery))
  }
  if (categories.length) return runQuery(mysql.format(appsQueryWithCategoriesFilter, [categories]))
  return runQuery(appsQuery)
}

module.exports.getCategories = () => runQuery(categoriesQuery)
