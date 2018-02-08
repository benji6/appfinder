import {combineReducers} from 'redux'
import app from './app'
import categories from './categories'
import categoryCases from './categoryCases'
import search from './search'
import user from './user'

export default combineReducers({
  app,
  categories,
  categoryCases,
  search,
  user,
})
