const pino = require('../pino')
const runQuery = require('../database/runQuery')

const query = 'SELECT * FROM categories'

exports.get = (req, res) => {
  runQuery(query)
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
