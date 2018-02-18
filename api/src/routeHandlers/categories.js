const pino = require('../pino')
const runQuery = require('../database/runQuery')

const query = 'SELECT * FROM categories'

const getCategories = () => runQuery(query)

exports.get = (req, res) => {
  getCategories()
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
