import {APPS_REQUEST_SUCCESS} from '../actions'

const initialState = {
  byId: null,
  ids: null,
}

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case APPS_REQUEST_SUCCESS: {
      const ids = []
      const byId = {}
      for (const app of payload) {
        const {id} = app
        ids.push(id)
        byId[id] = app
      }
      return Object.assign({}, state, {byId, ids})
    }
    default:
      return state
  }
}
