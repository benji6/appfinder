require('isomorphic-fetch')
const cors = require('cors')
const express = require('express')
const {get: appGet} = require('./routeHandlers/app')
const {get: appsGet} = require('./routeHandlers/apps')
const {get: categoriesGet} = require('./routeHandlers/categories')
const {get: appReviewsGet} = require('./routeHandlers/appReviews')
const {post: googleSignInPost} = require('./routeHandlers/googleSignIn')
const bodyParser = require('body-parser')
const pino = require('./pino')

const {PORT} = process.env

const textBodyParser = bodyParser.text()

const app = express()

app.use(cors())

app.get('/app/:id', appGet)
app.get('/app/:id/reviews', appReviewsGet)
app.get('/apps', appsGet)
app.get('/categories', categoriesGet)
app.post('/google-sign-in', textBodyParser, googleSignInPost)

app.listen(PORT, () => pino.info(`API listening on port ${PORT}\n`))
