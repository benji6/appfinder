import {combineReducers} from 'redux'
import apps from './apps'
import search from './search'
import tags from './tags'

export default combineReducers({
  apps,
  search,
  tags,
})
