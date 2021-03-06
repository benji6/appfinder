import {createSelector} from 'reselect'

const reviewsAllIdsSelector = state => state.reviews.allIds
const reviewsByIdSelector = state => state.reviews.byId

export const appRatingSelector = state => state.app.rating
export const categoriesLastUpdatedSelector = state => state.categories.lastUpdated
export const reviewsIsLoadingSelector = state => state.reviews.isLoading
export const searchIsLoadingSelector = state => state.search.isLoading
export const searchQuerySelector = state => state.search.query
export const totalRatingsSelector = state => state.reviews.allIds.length
export const userIdSelector = state => state.user.id

const userReviewRecordSelector = createSelector(
  reviewsByIdSelector,
  userIdSelector,
  (reviewsById, userId) => Object.values(reviewsById)
    .find(review => review.userId === userId),
)

export const userImageUrlSelector = state => state.user.imageUrl
export const userIsSignedInSelector = state => state.user.isSignedIn
export const userNameSelector = state => state.user.name
export const userReviewRecordExistsSelector = state => Boolean(userReviewRecordSelector(state))
export const userRatingSelector = state => userReviewRecordSelector(state) &&
  userReviewRecordSelector(state).rating
export const userReviewIdSelector = state => userReviewRecordSelector(state) &&
  userReviewRecordSelector(state).id
export const userReviewSelector = state => userReviewRecordSelector(state) &&
  userReviewRecordSelector(state).review

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

export const ratingsBreakdownSelector = createSelector(
  reviewsAllIdsSelector,
  reviewsByIdSelector,
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

export const searchResultsAppsSelector = ({
  search: {results: {allIds, byId}},
}) => allIds.map(id => byId[id])

export const textReviewsSelector = createSelector(
  reviewsAllIdsSelector,
  reviewsByIdSelector,
  (allIds, byId) => allIds
    .map(id => byId[id])
    .filter(({review}) => Boolean(review)),
)
