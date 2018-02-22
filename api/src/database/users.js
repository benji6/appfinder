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

const createNewUser = user => runQuery(
  'INSERT INTO users SET ?',
  user,
)

exports.handleSignIn = async user => {
  const {
    email,
    familyName,
    givenName,
    googleId,
    imageUrl,
    name,
  } = user

  if (await checkUserExists(googleId)) {
    // TODO: update a user if there are any changes
    return selectUser(googleId)
  }

  await createNewUser({
    email,
    family_name: familyName,
    given_name: givenName,
    google_id: googleId,
    image_url: imageUrl,
    name,
  })

  return selectUser(googleId)
}
