import {handleActions} from 'redux-actions'
import {categoryCaseGetSuccess} from '../actions'

const initialState = {}

export const categoryCaseAppsSelector = (state, {category}) => {
  const entity = state.categoryCases[category]
  if (!entity) return undefined
  const {byId, ids} = entity
  return ids.map(id => byId[id])
}

export const categoryCaseLastUpdatedSelector = (state, {category}) => {
  const entity = state.categoryCases[category]
  return entity && entity.lastUpdated
}

export default handleActions({
  [categoryCaseGetSuccess]: (state, {payload: {apps, category}}) => {
    const ids = []
    const byId = {}
    for (const app of apps) {
      const {id} = app
      ids.push(id)
      byId[id] = app
    }
    return {...state, [category]: {byId, ids, lastUpdated: Date.now()}}
  },
}, initialState)
