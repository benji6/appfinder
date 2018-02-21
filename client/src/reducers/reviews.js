import {handleActions} from 'redux-actions'
import {
  appDetailsMount,
  reviewsGetRequest,
  reviewsGetSuccess,
} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
  isLoading: false,
}

export default handleActions({
  [appDetailsMount]: () => initialState,
  [reviewsGetRequest]: state => ({...state, isLoading: true}),
  [reviewsGetSuccess]: (state, {payload}) => {
    const allIds = []
    const byId = {}

    for (const review of payload) {
      const {id} = review
      allIds.push(id)
      byId[id] = review
    }

    return {allIds, byId, isLoading: false}
  },
}, initialState)
