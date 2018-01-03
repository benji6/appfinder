import {handleActions} from 'redux-actions'
import {appsRequestSuccess} from '../actions'

const initialState = {
  byId: null,
  ids: null,
}

export default handleActions({
  [appsRequestSuccess]: (state, {payload}) => {
    const ids = []
    const byId = {}
    for (const app of payload) {
      const {id} = app
      ids.push(id)
      byId[id] = app
    }
    return Object.assign({}, state, {byId, ids})
  },
}, initialState)
