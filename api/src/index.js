const cors = require('cors')
const express = require('express')
const {getApps, getTags} = require('./database')

const {PORT} = process.env

const app = express()

app.use(cors())

app.get('/apps', (req, res) => {
  getApps({
    query: req.query.query || '',
    tags: req.query.tags || [],
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
})

app.get('/tags', (req, res) => {
  getTags()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
})

app.listen(PORT, () => process.stdout.write(`api listening on port ${PORT}\n`))
