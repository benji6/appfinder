import {handleActions} from 'redux-actions'
import {
  appDetailsMount,
  reviewsGetSuccess,
} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
}

export default handleActions({
  [appDetailsMount]: () => initialState,
  [reviewsGetSuccess]: (state, {payload}) => {
    const allIds = []
    const byId = {}

    for (const review of payload) {
      const {id} = review
      allIds.push(id)
      byId[id] = review
    }

    return {allIds, byId}
  },
}, initialState)
