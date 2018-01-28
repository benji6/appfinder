import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  appDetailsMount,
  appGetSuccess,
} from '../actions'
import {getApp} from '../api'

function* fetchApp({payload}) {
  try {
    const app = yield call(getApp, payload)
    yield put(appGetSuccess(app))
  } catch (e) {
    console.error(e)
  }
}

export default function* watchAppDetailsMount() {
  yield takeLatest(appDetailsMount, fetchApp)
}
