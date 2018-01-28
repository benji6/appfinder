const cors = require('cors')
const express = require('express')
const {getApp} = require('./database/app')
const {getApps} = require('./database/apps')
const {getCategories} = require('./database/categories')
const {SEARCH_QUERY_MAX_LENGTH} = require('./constants')

const {PORT} = process.env

const app = express()

app.use(cors())

app.get('/app/:id', (req, res) => {
  getApp(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/apps', (req, res) => {
  const {query} = req.query

  if (query && query.length > SEARCH_QUERY_MAX_LENGTH) {
    res.status(400).send(`query param exceeds maxLength of ${SEARCH_QUERY_MAX_LENGTH}`)
    return
  }

  getApps({
    query: query || '',
    category: req.query.category,
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/categories', (req, res) => {
  getCategories()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

app.listen(PORT, () => process.stdout.write(`api listening on port ${PORT}\n`))
