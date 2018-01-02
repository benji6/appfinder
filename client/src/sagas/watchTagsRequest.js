import {call, put, takeEvery} from 'redux-saga/effects'
import {
  TAGS_REQUEST,
  tagsRequestFail,
  tagsRequestSuccess,
} from '../actions'
import {getTags} from '../api'

export function* fetchTags() {
  try {
    const tags = yield call(getTags)
    yield put(tagsRequestSuccess(tags))
  } catch (e) {
    yield put(tagsRequestFail())
  }
}

function* watchTagsRequest() {
  yield takeEvery(TAGS_REQUEST, fetchTags)
}

export default watchTagsRequest
