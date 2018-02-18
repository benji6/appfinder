import {handleActions} from 'redux-actions'
import {
  appDetailsMount,
  reviewsGetSuccess,
} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
}

export const ratingsBreakdownSelector = ({reviews: {allIds, byId}}) => {
  const totalRatings = allIds.length

  const breakdownByCount = allIds
    .reduce((breakdown, id) => {
      const {rating} = byId[id]
      return {
        ...breakdown,
        [rating]: breakdown[id] + 1,
      }
    }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0})

  return Object.entries(breakdownByCount)
    .reduce((acc, [key, val]) => ({...acc, [key]: val / totalRatings}), {})
}

export const reviewsSelector = ({reviews: {allIds, byId}}) => allIds.map(id => byId[id])
export const totalRatingsSelector = state => state.reviews.allIds.length

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
