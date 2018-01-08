import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import {
  appsRequest,
  appsRequestFail,
  appsRequestSuccess,
  tagsToggleSelectedTag,
} from '../actions'
import {getApps} from '../api'
import {
  selectedTagIdsSelector,
  tagsByIdSelector,
} from '../reducers/tags'

export function* fetchApps() {
  try {
    const selectedTagIds = yield select(selectedTagIdsSelector)
    const tagsById = yield select(tagsByIdSelector)
    const selectedTagNames = selectedTagIds.map(id => tagsById[id].name)
    const apps = yield call(getApps, selectedTagNames)
    yield put(appsRequestSuccess(apps))
  } catch (e) {
    yield put(appsRequestFail())
  }
}

function* watchAppsRequest() {
  yield takeLatest(appsRequest, fetchApps)
}

function* watchTagsToggleSelectedTag() {
  yield takeLatest(tagsToggleSelectedTag, fetchApps)
}

export default function* tagsSaga() {
  yield all([
    fork(watchAppsRequest),
    fork(watchTagsToggleSelectedTag),
  ])
}
