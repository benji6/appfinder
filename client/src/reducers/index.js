import {combineReducers} from 'redux'
import apps from './apps'
import search from './search'
import categories from './categories'

export default combineReducers({
  apps,
  search,
  categories,
})
