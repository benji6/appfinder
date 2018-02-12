const pino = require('../pino')
const {getReviews} = require('../database/reviews')

exports.get = (req, res) => {
  getReviews(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
