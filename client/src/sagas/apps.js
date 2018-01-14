import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  appsRequest,
  appsRequestFail,
  appsRequestSuccess,
  searchQuerySet,
  categoryCaseMount,
  categoryCaseGetSuccess,
} from '../actions'
import {getApps} from '../api'
import {searchQuerySelector} from '../reducers/search'

export function* fetchApps() {
  try {
    const query = (yield select(searchQuerySelector)).trim()
    const apps = yield call(getApps, {query})
    yield put(appsRequestSuccess(apps))
  } catch (e) {
    console.error(e)
    yield put(appsRequestFail())
  }
}

export function* fetchAppsForCategoryCase({payload: category}) {
  try {
    const apps = yield call(getApps, {category})
    yield put(categoryCaseGetSuccess({apps, category}))
  } catch (e) {
    console.error(e)
    yield put(appsRequestFail())
  }
}

function* watchAppsRequest() {
  yield takeLatest(appsRequest, fetchApps)
}

function* watchCategoryCaseMount() {
  yield takeEvery(categoryCaseMount, fetchAppsForCategoryCase)
}

function* watchSearchQuerySet() {
  yield takeLatest(searchQuerySet, fetchApps)
}

export default function* appsSaga() {
  yield all([
    fork(watchAppsRequest),
    fork(watchCategoryCaseMount),
    fork(watchSearchQuerySet),
  ])
}
