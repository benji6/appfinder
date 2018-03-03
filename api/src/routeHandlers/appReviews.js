/* eslint-disable block-scoped-var,no-var,vars-on-top */

const pino = require('../pino')
const runQuery = require('../runQuery')

const insertQuery = `
INSERT INTO reviews (app_id, rating, review, user_id)
VALUES (?, ?, ?, ?)
`

const updateQuery = `
UPDATE reviews
SET
  rating = ?,
  review = ?
WHERE id = ?
`

const selectQueryShared = `
SELECT
  date_created AS dateCreated,
  reviews.id,
  rating,
  review,
  users.image_url AS imageUrl,
  users.id AS userId,
  users.name AS userName
FROM reviews
INNER JOIN users ON users.id = reviews.user_id
`

const selectAppReviewsQuery = `
${selectQueryShared}
WHERE reviews.app_id = ?
ORDER BY reviews.id
`

const selectReviewByIdQuery = `
${selectQueryShared}
WHERE reviews.id = ?
`

const selectReviewByAppAndUserIdQuery = `
${selectQueryShared}
WHERE reviews.app_id = ?
AND reviews.user_id = ?
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
  const appId = req.params.id
  const {rating, review, userId} = req.body

  try {
    const existingRecords = await runQuery(selectReviewByAppAndUserIdQuery, [appId, userId])

    if (existingRecords.length) {
      res.sendStatus(400)
      pino.error(new Error(`Attempted to post multiple reviews - appId: ${appId} & userId: ${userId}`))
      return
    }

    const {insertId} = await runQuery(insertQuery, [appId, rating, review, userId])
    const [reviewRecord] = await runQuery(selectReviewByIdQuery, [insertId])
    res.send(reviewRecord)
  } catch (e) {
    pino.error(e)
    res.sendStatus(500)
  }
}

exports.put = async (req, res) => {
  const {rating, review, reviewId} = req.body

  try {
    var recordCount = await runQuery(updateQuery, [rating, review, reviewId])
  } catch (e) {
    pino.error(e)
    res.sendStatus(500)
    return
  }

  if (!recordCount) {
    res.sendStatus(400)
    pino.error(new Error(`Attempted to update nonexistent review - reviewId: ${reviewId}`))
    return
  }

  try {
    const [reviewRecord] = await runQuery(selectReviewByIdQuery, [reviewId])
    res.send(reviewRecord)
  } catch (e) {
    pino.error(e)
    res.sendStatus(500)
  }
}
