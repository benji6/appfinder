export const getApp = id => fetch(`http://localhost:3001/app/${id}`)
  .then(response => response.json())

export const getApps = ({query, category}) => {
  const categoryQueryString = category ? `category=${category}` : ''

  const queryQueryString = query ? `query=${query}` : ''

  const queryStrings = [categoryQueryString, queryQueryString]
    .filter(s => s.length)

  const queryString = queryStrings.length
    ? `?${queryStrings.join('&')}`
    : ''

  return fetch(`http://localhost:3001/apps${queryString}`)
    .then(response => response.json())
}

export const getCategories = () => fetch('http://localhost:3001/categories')
  .then(response => response.json())
