export const getApps = ({query, tags}) => {
  const tagsQueryString = tags.length
    ? `tags[]=${tags.join('&tags[]=')}`
    : ''

  const queryQueryString = query && `query=${query}`

  const queryStrings = [queryQueryString, tagsQueryString]
    .filter(s => s.length)

  const queryString = queryStrings.length
    ? `?${queryStrings.join('&')}`
    : ''

  return fetch(`http://localhost:3001/apps${queryString}`)
    .then(response => response.json())
}

export const getTags = () => fetch('http://localhost:3001/tags')
  .then(response => response.json())
