const cors = require('cors')
const express = require('express')
const {getApps} = require('./database/apps')

const {PORT} = process.env

const app = express()

app.use(cors())

app.get('/apps', (req, res) => {
  getApps({
    query: req.query.query || '',
    category: req.query.category,
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
})

app.listen(PORT, () => process.stdout.write(`api listening on port ${PORT}\n`))
