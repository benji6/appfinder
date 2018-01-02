import {fork, all} from 'redux-saga/effects'
import watchAppsRequest from './watchAppsRequest'
import watchTagsRequest from './watchTagsRequest'

export default function* rootSaga() {
  yield all([
    fork(watchAppsRequest),
    fork(watchTagsRequest),
  ])
}
