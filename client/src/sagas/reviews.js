import {call, put, takeLatest} from 'redux-saga/effects'
import {
  reviewsGetRequest,
  reviewsGetSuccess,
} from '../actions'
import {getReviews} from '../api'

function* fetchReviews({payload}) {
  try {
    const review = yield call(getReviews, payload)
    yield put(reviewsGetSuccess(review))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchReviewsGetRequest() {
  yield takeLatest(reviewsGetRequest, fetchReviews)
}
