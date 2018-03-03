import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  appGetSuccess,
  reviewsGetSuccess,
  reviewsUpdateRequest,
} from '../actions'
import {getApp, getReviews} from '../api'

function* handleReviewsUpdateRequest({payload}) {
  try {
    const [app, review] = yield all([
      call(getApp, payload),
      call(getReviews, payload),
    ])
    yield put(appGetSuccess(app))
    yield put(reviewsGetSuccess(review))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchReviewsUpdateRequest() {
  yield takeLatest(reviewsUpdateRequest, handleReviewsUpdateRequest)
}
