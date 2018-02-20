import {handleActions} from 'redux-actions'
import {categoryCaseGetSuccess} from '../actions'

const initialState = {}

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
