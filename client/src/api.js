const API_URI = 'http://localhost:3001'

export const getApp = id => fetch(`${API_URI}/app/${id}`)
  .then(response => response.json())

export const getApps = ({query, category}) => {
  const categoryQueryString = category ? `category=${category}` : ''

  const queryQueryString = query ? `query=${query}` : ''

  const queryStrings = [categoryQueryString, queryQueryString]
    .filter(s => s.length)

  const queryString = queryStrings.length
    ? `?${queryStrings.join('&')}`
    : ''

  return fetch(`${API_URI}/apps${queryString}`)
    .then(response => response.json())
}

export const getCategories = () => fetch(`${API_URI}/categories`)
  .then(response => response.json())

export const postGoogleSignIn = body => fetch(`${API_URI}/google-sign-in`, {
  body,
  method: 'POST',
})
  .then(response => response.json())
