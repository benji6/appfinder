import {call, select, takeLatest} from 'redux-saga/effects'
import {reviewFormSubmit} from '../actions'
import {postReview} from '../api'
import {userIdSelector} from '../selectors'

function* submitReviewForm({payload}) {
  const userId = yield select(userIdSelector)

  try {
    yield call(postReview, {...payload, userId})
    // yield put(appGetSuccess(app))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchReviewFormSubmit() {
  yield takeLatest(reviewFormSubmit, submitReviewForm)
}
