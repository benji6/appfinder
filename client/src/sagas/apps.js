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
  categoriesToggleSelectedCategory,
} from '../actions'
import {getApps} from '../api'
import {querySelector} from '../reducers/search'
import {
  selectedCategoryIdsSelector,
  categoriesByIdSelector,
} from '../reducers/categories'

export function* fetchApps() {
  try {
    const selectedCategoryIds = yield select(selectedCategoryIdsSelector)
    const query = yield select(querySelector)
    const categoriesById = yield select(categoriesByIdSelector)
    const selectedCategoryNames = selectedCategoryIds.map(id => categoriesById[id].name)
    const apps = yield call(getApps, {
      query,
      categories: selectedCategoryNames,
    })
    yield put(appsRequestSuccess(apps))
  } catch (e) {
    yield put(appsRequestFail())
  }
}

function* watchAppsRequest() {
  yield takeLatest(appsRequest, fetchApps)
}

function* watchCategoriesToggleSelectedCategory() {
  yield takeLatest(categoriesToggleSelectedCategory, fetchApps)
}

function* watchSearchQuerySet() {
  yield takeLatest(searchQuerySet, fetchApps)
}

export default function* appsSaga() {
  yield all([
    fork(watchAppsRequest),
    fork(watchSearchQuerySet),
    fork(watchCategoriesToggleSelectedCategory),
  ])
}
