import {fork, all} from 'redux-saga/effects'
import apps from './apps'

export default function* rootSaga() {
  yield all([
    fork(apps),
  ])
}
