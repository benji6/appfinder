import {fork, all} from 'redux-saga/effects'
import app from './app'
import apps from './apps'
import categories from './categories'
import reviewForm from './reviewForm'
import user from './user'

export default function* rootSaga() {
  yield all([
    app,
    apps,
    categories,
    reviewForm,
    user,
  ].map(fork))
}
