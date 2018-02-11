const pino = require('../pino')
const {handleSignIn} = require('../database/users')

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
