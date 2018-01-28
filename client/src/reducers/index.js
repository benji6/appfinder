import {combineReducers} from 'redux'
import app from './app'
import search from './search'
import categoryCases from './categoryCases'

export default combineReducers({
  app,
  categoryCases,
  search,
})
