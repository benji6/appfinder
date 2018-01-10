export const getApps = ({query, categories}) => {
  const categoriesQueryString = categories.length
    ? `categories[]=${categories.join('&categories[]=')}`
    : ''

  const queryQueryString = query && `query=${query}`

  const queryStrings = [queryQueryString, categoriesQueryString]
    .filter(s => s.length)

  const queryString = queryStrings.length
    ? `?${queryStrings.join('&')}`
    : ''

  return fetch(`http://localhost:3001/apps${queryString}`)
    .then(response => response.json())
}

export const getCategories = () => fetch('http://localhost:3001/categories')
  .then(response => response.json())
