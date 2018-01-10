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
  searchQuerySet,
  tagsToggleSelectedTag,
} from '../actions'
import {getApps} from '../api'
import {querySelector} from '../reducers/search'
import {
  selectedTagIdsSelector,
  tagsByIdSelector,
} from '../reducers/tags'

export function* fetchApps() {
  try {
    const selectedTagIds = yield select(selectedTagIdsSelector)
    const query = yield select(querySelector)
    const tagsById = yield select(tagsByIdSelector)
    const selectedTagNames = selectedTagIds.map(id => tagsById[id].name)
    const apps = yield call(getApps, {
      query,
      tags: selectedTagNames,
    })
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

function* watchSearchQuerySet() {
  yield takeLatest(searchQuerySet, fetchApps)
}

export default function* appsSaga() {
  yield all([
    fork(watchAppsRequest),
    fork(watchSearchQuerySet),
    fork(watchTagsToggleSelectedTag),
  ])
}
