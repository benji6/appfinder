/* eslint-disable no-console */
const axios = require('axios')
const cheerio = require('cheerio')

const fetchDescription = url => axios.get(url)
  .then(({data: html}) => {
    const $ = cheerio.load(html)
    const $metaDescription = $('meta[name="description"]')
    if (!$metaDescription) return console.error(`No meta description tag for ${url}`)
    const content = $metaDescription.attr('content')
    if (!content) return console.error(`No meta description content for ${url}`)
    return content
  })
  .catch(e => console.error(`Caught error for ${url}`, e))

const main = async () => {
  const {data} = await axios.get('http://localhost:3001/apps')
  const urls = data.map(({url}) => url)
  const descriptions = await Promise.all(urls.map(fetchDescription))
  return descriptions.map((description, i) => ({description, url: urls[i]}))
}

main().then(console.log)
