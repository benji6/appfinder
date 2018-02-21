import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  appDetailsMount,
  appGetRequest,
  appGetSuccess,
  reviewsGetRequest,
  reviewsGetSuccess,
} from '../actions'
import {getApp, getReviews} from '../api'

function* fetchAppData({payload}) {
  yield put(appGetRequest())
  yield put(reviewsGetRequest())
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

export default function* watchAppDetailsMount() {
  yield takeLatest(appDetailsMount, fetchAppData)
}
