const pino = require('../pino')
const runQuery = require('../database/runQuery')

const query = `
SELECT
  date_created AS dateCreated,
  reviews.id,
  rating,
  review,
  users.image_url AS imageUrl,
  users.name AS userName
FROM reviews
INNER JOIN users ON users.id = reviews.user_id
WHERE reviews.app_id = ?
`

const getReviews = appId => runQuery(query, [appId])

exports.get = (req, res) => {
  getReviews(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
