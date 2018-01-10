import {fork, all} from 'redux-saga/effects'
import apps from './apps'
import categories from './categories'

export default function* rootSaga() {
  yield all([
    fork(apps),
    fork(categories),
  ])
}
