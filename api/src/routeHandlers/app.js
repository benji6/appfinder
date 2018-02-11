const pino = require('../pino')
const {getApp} = require('../database/app')

exports.get = (req, res) => {
  getApp(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
