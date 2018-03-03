import {call, put, select, takeLatest} from 'redux-saga/effects'
import {reviewFormSubmit, reviewsUpdateRequest} from '../actions'
import {postReview, putReview} from '../api'
import {
  userIdSelector,
  userReviewRecordExistsSelector,
} from '../selectors'

function* submitReviewForm({payload: {appId, rating, review, reviewId}}) {
  const userId = yield select(userIdSelector)
  const isPut = yield select(userReviewRecordExistsSelector)

  try {
    if (isPut) {
      yield call(putReview, {rating, review, reviewId})
    } else {
      yield call(postReview, {appId, rating, review, userId})
    }
    yield put(reviewsUpdateRequest(appId))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchReviewFormSubmit() {
  yield takeLatest(reviewFormSubmit, submitReviewForm)
}
