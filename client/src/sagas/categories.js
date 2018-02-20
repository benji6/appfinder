import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import {
  appDetailsMount,
  categoriesGetSuccess,
} from '../actions'
import {getCategories} from '../api'
import {categoriesLastUpdatedSelector} from '../selectors'

function* fetchCategories() {
  const lastUpdated = yield select(categoriesLastUpdatedSelector)

  if (lastUpdated && Date.now() - lastUpdated < 6e5) return

  try {
    const categories = yield call(getCategories)
    yield put(categoriesGetSuccess(categories))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchCategoryGet() {
  yield takeLatest(appDetailsMount, fetchCategories)
}
