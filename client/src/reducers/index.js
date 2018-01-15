import {combineReducers} from 'redux'
import search from './search'
import categoryCases from './categoryCases'

export default combineReducers({
  search,
  categoryCases,
})
