export const getApps = tags => {
  const queryString = tags.length
    ? `?tags[]=${tags.join('&tags[]=')}`
    : ''
  return fetch(`http://localhost:3001/apps${queryString}`)
    .then(response => response.json())
}

export const getTags = () => fetch('http://localhost:3001/tags')
  .then(response => response.json())
