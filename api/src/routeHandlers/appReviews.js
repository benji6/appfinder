const pino = require('../pino')
const runQuery = require('../database/runQuery')

const insertQuery = `
INSERT INTO reviews (app_id, rating, review, user_id)
VALUES (?, ?, ?, ?)
`

const selectQueryShared = `
SELECT
  date_created AS dateCreated,
  reviews.id,
  rating,
  review,
  users.image_url AS imageUrl,
  users.name AS userName
FROM reviews
INNER JOIN users ON users.id = reviews.user_id
`

const selectAppReviewsQuery = `
${selectQueryShared}
WHERE reviews.app_id = ?
ORDER BY reviews.id
`

const selectReviewQuery = `
${selectQueryShared}
WHERE reviews.id = ?
`

exports.get = (req, res) => {
  runQuery(selectAppReviewsQuery, [req.params.id])
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}

exports.post = async (req, res) => {
  const {rating, review, userId} = req.body

  try {
    const {insertId} = await runQuery(insertQuery, [req.params.id, rating, review, userId])
    const [reviewRecord] = await runQuery(selectReviewQuery, [insertId])
    res.send(reviewRecord)
  } catch (e) {
    pino.error(e)
    res.sendStatus(500)
  }
}
