const runQuery = require('./runQuery')

const checkUserExists = googleId => runQuery(
  'SELECT * FROM users WHERE google_id=?',
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
    return user
  }

  await createNewUser({
    email,
    family_name: familyName,
    given_name: givenName,
    google_id: googleId,
    image_url: imageUrl,
    name,
  })

  return user
}
