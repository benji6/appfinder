import {call, put, takeEvery} from 'redux-saga/effects'
import {
  appsRequest,
  appsRequestFail,
  appsRequestSuccess,
} from '../actions'
import {getApps} from '../api'

export function* fetchApps() {
  try {
    const apps = yield call(getApps)
    yield put(appsRequestSuccess(apps))
  } catch (e) {
    yield put(appsRequestFail())
  }
}

function* watchAppsRequest() {
  yield takeEvery(appsRequest, fetchApps)
}

export default watchAppsRequest
