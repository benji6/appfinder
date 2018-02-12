const runQuery = require('./runQuery')

const query = `
SELECT
apps.id,
apps.color,
apps.description,
apps.icon_url AS iconUrl,
apps.name,
AVG(reviews.rating) AS rating,
apps.url,
GROUP_CONCAT(DISTINCT categories.id) AS categoryIds
FROM apps
LEFT JOIN app_categories ON apps.id = app_categories.app_id
LEFT JOIN categories ON app_categories.category_id = categories.id
LEFT JOIN reviews ON apps.id = reviews.app_id
WHERE apps.id = ?
`

exports.getApp = id => runQuery(query, [Number(id)])
  .then(([result]) => {
    result.categoryIds = JSON.parse(`[${result.categoryIds}]`) // eslint-disable-line no-param-reassign
    return result
  })
