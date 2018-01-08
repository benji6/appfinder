import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import {
  tagsRequest,
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

export default function* watchTagsRequest() {
  yield takeEvery(tagsRequest, fetchTags)
}
