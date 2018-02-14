const runQuery = require('./runQuery')

const query = 'SELECT id, rating, review, user_id as userId FROM reviews where app_id = ?'

exports.getReviews = appId => runQuery(query, [appId])
