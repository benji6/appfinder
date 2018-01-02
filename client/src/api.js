export const getApps = () => fetch('http://localhost:3001/apps')
  .then(response => response.json())

export const getTags = () => fetch('http://localhost:3001/tags')
  .then(response => response.json())
