import {delay} from 'redux-saga'
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  appsRequestFail,
  appsRequestSuccess,
  searchQuerySet,
  categoryCaseMount,
  categoryCaseGetSuccess,
} from '../actions'
import {getApps} from '../api'

export function* fetchApps({payload: query}) {
  if (!query) return

  yield call(delay, 500)

  try {
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

function* watchCategoryCaseMount() {
  yield takeEvery(categoryCaseMount, fetchAppsForCategoryCase)
}

function* watchSearchQuerySet() {
  yield takeLatest(searchQuerySet, fetchApps)
}

export default function* appsSaga() {
  yield all([
    fork(watchCategoryCaseMount),
    fork(watchSearchQuerySet),
  ])
}
