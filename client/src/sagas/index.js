import {fork, all} from 'redux-saga/effects'
import app from './app'
import apps from './apps'

export default function* rootSaga() {
  yield all([
    fork(app),
    fork(apps),
  ])
}
