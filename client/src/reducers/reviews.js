import {handleActions} from 'redux-actions'
import {createSelector} from 'reselect'
import {
  appDetailsMount,
  reviewsGetSuccess,
} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
}

const allIdsSelector = state => state.reviews.allIds
const byIdSelector = state => state.reviews.byId

export const ratingsBreakdownSelector = createSelector(
  allIdsSelector,
  byIdSelector,
  (allIds, byId) => {
    const totalRatings = allIds.length

    const breakdownByCount = allIds
      .reduce((breakdown, id) => {
        const {rating} = byId[id]
        return {
          ...breakdown,
          [rating]: breakdown[rating] + 1,
        }
      }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
    return Object.entries(breakdownByCount)
      .reduce((acc, [key, val]) => ({...acc, [key]: val / totalRatings}), {})
  },
)

export const totalRatingsSelector = state => state.reviews.allIds.length

export const textReviewsSelector = createSelector(
  allIdsSelector,
  byIdSelector,
  (allIds, byId) => allIds
    .map(id => byId[id])
    .filter(({review}) => Boolean(review)),
)

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
