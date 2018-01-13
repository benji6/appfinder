import {combineReducers} from 'redux'
import apps from './apps'
import search from './search'
import categoryCases from './categoryCases'

export default combineReducers({
  apps,
  search,
  categoryCases,
})
