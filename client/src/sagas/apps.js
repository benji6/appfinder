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
  searchRequestInitiate,
  searchRequestFail,
  searchRequestSuccess,
} from '../actions'
import {getApps} from '../api'
import {categoryCaseLastUpdatedSelector} from '../reducers/categoryCases'
import {searchQuerySelector} from '../reducers/search'

export function* fetchApps({payload: query}) {
  const previousQuery = yield select(searchQuerySelector)

  const trimmedQuery = query.trim()

  yield put(searchQuerySet(query))

  if (!query || trimmedQuery === previousQuery.trim()) return

  yield put(searchRequestInitiate())

  yield call(delay, 500)

  try {
    const apps = yield call(getApps, {query: trimmedQuery})
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
  yield takeLatest(searchRequest, fetchApps)
}

export default function* appsSaga() {
  yield all([
    fork(watchCategoryCaseMount),
    fork(watchSearchQuerySet),
  ])
}
