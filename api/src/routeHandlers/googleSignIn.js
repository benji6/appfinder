const pino = require('../pino')
const runQuery = require('../runQuery')

const selectUserQuery = `
SELECT
  id,
  email,
  family_name AS familyName,
  given_name AS givenName,
  google_id AS googleId,
  image_url AS imageUrl,
  name
FROM users
WHERE google_id = ?
`

const selectUser = googleId => runQuery(selectUserQuery, [googleId])
  .then(results => results[0])

const checkUserExists = googleId => runQuery(
  'SELECT * FROM users WHERE google_id = ?',
  [googleId],
)
  .then(results => Boolean(results.length))

const handleSignIn = async ({
  email,
  familyName,
  givenName,
  googleId,
  imageUrl,
  name,
}) => {
  if (await checkUserExists(googleId)) {
    // TODO: update a user if there are any changes
    return selectUser(googleId)
  }

  await runQuery('INSERT INTO users SET ?', {
    email,
    family_name: familyName,
    given_name: givenName,
    google_id: googleId,
    image_url: imageUrl,
    name,
  })

  return selectUser(googleId)
}

const {GOOGLE_CLIENT_ID} = process.env

exports.post = (req, res) => {
  fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body}`)
    .then(
      response => {
        if (response.ok) return response.json()
        throw new Error(response.statusText)
      },
      err => {
        pino.error(err)
        res.sendStatus(500)
      },
    )
    .then(data => {
      const {
        aud,
        email,
        family_name: familyName,
        given_name: givenName,
        name,
        picture,
        sub: googleId,
      } = data

      if (aud !== GOOGLE_CLIENT_ID) {
        throw new Error(`invalid google client id: ${data.aud}`)
      }

      handleSignIn({
        email,
        familyName,
        givenName,
        googleId,
        imageUrl: picture,
        name,
      })
        .then(user => res.send(user))
        .catch(err => {
          pino.error(err)
          res.sendStatus(500)
        })
    })
    .catch(err => {
      pino.error(err)
      res.sendStatus(400)
    })
}
