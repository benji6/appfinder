import {fork, all} from 'redux-saga/effects'
import apps from './apps'
import tags from './tags'

export default function* rootSaga() {
  yield all([
    fork(apps),
    fork(tags),
  ])
}
