const pino = require('../pino')
const {getApps} = require('../database/apps')
const {SEARCH_QUERY_MAX_LENGTH} = require('../constants')

exports.get = (req, res) => {
  const {query} = req.query

  if (query && query.length > SEARCH_QUERY_MAX_LENGTH) {
    res.status(400).send(`query param exceeds maxLength of ${SEARCH_QUERY_MAX_LENGTH}`)
    return
  }

  getApps({
    category: req.query.category,
    query: query || '',
  })
    .then(data => res.send(data))
    .catch(err => {
      pino.error(err)
      res.sendStatus(500)
    })
}
