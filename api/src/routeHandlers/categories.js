const pino = require('../pino')
const {getCategories} = require('../database/categories')

exports.get = (req, res) => {
  getCategories()
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
