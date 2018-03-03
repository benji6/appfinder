const API_URI = 'http://localhost:3001'

const handleJsonResponse = response => {
  if (response.ok) return response.json()
  throw new Error(`Bad response status: ${response.status}`)
}

export const getApp = id => fetch(`${API_URI}/app/${id}`)
  .then(handleJsonResponse)

export const getApps = ({query, category}) => {
  const categoryQueryString = category ? `category=${category}` : ''

  const queryQueryString = query ? `query=${query}` : ''

  const queryStrings = [categoryQueryString, queryQueryString]
    .filter(s => s.length)

  const queryString = queryStrings.length
    ? `?${queryStrings.join('&')}`
    : ''

  return fetch(`${API_URI}/apps${queryString}`)
    .then(handleJsonResponse)
}

export const getCategories = () => fetch(`${API_URI}/categories`)
  .then(handleJsonResponse)

export const getReviews = appId => fetch(`${API_URI}/reviews?appId=${appId}`)
  .then(handleJsonResponse)

export const postGoogleSignIn = body => fetch(`${API_URI}/google-sign-in`, {
  body,
  method: 'POST',
})
  .then(handleJsonResponse)

export const postReview = ({appId, rating, review, userId}) => fetch(`${API_URI}/reviews`, {
  body: JSON.stringify({appId, rating, review, userId}),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
})
  .then(handleJsonResponse)

export const putReview = ({rating, review, reviewId}) => fetch(`${API_URI}/reviews/${reviewId}`, {
  body: JSON.stringify({rating, review}),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'PUT',
})
  .then(handleJsonResponse)
