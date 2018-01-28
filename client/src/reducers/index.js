import {combineReducers} from 'redux'
import app from './app'
import categories from './categories'
import categoryCases from './categoryCases'
import search from './search'

export default combineReducers({
  app,
  categories,
  categoryCases,
  search,
})
