import {handleActions} from 'redux-actions'
import {reviewsGetSuccess} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
}

export const reviewsSelector = state => state.reviews.allIds.map(id => state.reviews.byId[id])

export default handleActions({
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
