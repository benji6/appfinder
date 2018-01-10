import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects'
import {
  categoriesRequest,
  categoriesRequestFail,
  categoriesRequestSuccess,
} from '../actions'
import {getCategories} from '../api'

export function* fetchCategories() {
  try {
    const categories = yield call(getCategories)
    yield put(categoriesRequestSuccess(categories))
  } catch (e) {
    yield put(categoriesRequestFail())
  }
}

export default function* watchCategoriesRequest() {
  yield takeEvery(categoriesRequest, fetchCategories)
}
