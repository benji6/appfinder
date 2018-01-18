import {delay} from 'redux-saga'
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
  categoryCaseGetSuccess,
  categoryCaseMount,
  searchQuerySet,
  searchRequest,
  searchRequestFail,
  searchRequestSuccess,
} from '../actions'
import {getApps} from '../api'
import {categoryCaseLastUpdatedSelector} from '../reducers/categoryCases'

export function* fetchApps({payload: query}) {
  if (!query) return

  yield put(searchRequest())

  yield call(delay, 500)

  try {
    const apps = yield call(getApps, {query})
    yield put(searchRequestSuccess(apps))
  } catch (e) {
    console.error(e)
    yield put(searchRequestFail())
  }
}

export function* fetchAppsForCategoryCase({payload: category}) {
  const lastUpdated = yield select(categoryCaseLastUpdatedSelector, {category})

  if (lastUpdated && Date.now() - lastUpdated < 6e5) return

  try {
    const apps = yield call(getApps, {category})
    yield put(categoryCaseGetSuccess({apps, category}))
  } catch (e) {
    console.error(e)
    yield put(searchRequestFail())
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
