const mysql = require('mysql')
const runQuery = require('./runQuery')

const selectAllQuery = `
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
`

const appsQuery = `
${selectAllQuery}
GROUP BY id
ORDER BY RAND()
`

const appsQueryWithCategory = `
${selectAllQuery}
WHERE categories.name = ?
GROUP BY id
ORDER BY RAND()
`

const appsQueryWithQuery = query => `
${selectAllQuery}
WHERE apps.name LIKE ${query}
OR categories.name LIKE ${query}
GROUP BY id
ORDER BY RAND()
`

const escapeWildcards = str => str.replace(/%/g, '\\%').replace(/_/g, '\\_')
const insertWildcards = str => str.replace(/\*/g, '%')

module.exports.getApps = ({query, category}) => {
  if (category) {
    return runQuery(mysql.format(appsQueryWithCategory, [category]))
  }
  if (query) {
    const escapedQuery = mysql.escape(`%${insertWildcards(escapeWildcards(query))}%`)
    return runQuery(appsQueryWithQuery(escapedQuery))
  }
  return runQuery(appsQuery)
}
