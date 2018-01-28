
const runQuery = require('./runQuery')

const query = 'SELECT * FROM categories'

exports.getCategories = () => runQuery(query)
