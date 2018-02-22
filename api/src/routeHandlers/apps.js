const pino = require('../pino')
const {SEARCH_QUERY_MAX_LENGTH} = require('../constants')
const mysql = require('mysql')
const runQuery = require('../runQuery')

const selectAllQuery = `
SELECT
apps.id,
apps.color,
apps.icon_url AS iconUrl,
apps.name,
AVG(reviews.rating) AS rating,
apps.url,
GROUP_CONCAT(categories.id) AS category_ids
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
LEFT JOIN reviews ON apps.id = reviews.app_id
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

const appsSearchQuery = ({appNameQuery, categoryNameQuery, orderBy}) => `
${selectAllQuery}
WHERE apps.name LIKE ${appNameQuery}
OR categories.name = ${categoryNameQuery}
GROUP BY id
ORDER BY ${orderBy}
`

const escapeWildcards = str => str.replace(/%/g, '\\%').replace(/_/g, '\\_')
const insertWildcards = str => str.replace(/\*/g, '%')

const getApps = ({category, query}) => {
  if (category) {
    return runQuery(mysql.format(appsQueryWithCategory, [category]))
  }
  if (query) {
    const isTinyQuery = query.length <= 3
    const appNameQuery = mysql.escape(`${isTinyQuery ? '' : '%'}${insertWildcards(escapeWildcards(query))}%`)
    const categoryNameQuery = mysql.escape(`${query}`)
    const orderBy = isTinyQuery ? 'apps.name' : 'RAND()'
    return runQuery(appsSearchQuery({appNameQuery, categoryNameQuery, orderBy}))
  }
  return runQuery(appsQuery)
}

exports.get = (req, res) => {
  const {category, query} = req.query

  if (query && query.length > SEARCH_QUERY_MAX_LENGTH) {
    res.status(400).send(`query param exceeds maxLength of ${SEARCH_QUERY_MAX_LENGTH}`)
    return
  }

  getApps({
    category,
    query: query || '',
  })
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
