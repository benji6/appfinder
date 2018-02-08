import {eventChannel, END} from 'redux-saga'
import {all, call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
  userGetSuccess,
  userNotSignedIn,
  userSignInSuccess,
  userSignOutRequest,
  userSignOutSuccess,
} from '../actions'

let emitter = null

window.handleGapiLoad = () => window.gapi.load('auth2', () => {
  const auth2 = window.gapi.auth2.init()
  if (auth2.isSignedIn.get()) {
    const profile = auth2.currentUser.get().getBasicProfile()
    emitter({isSignedIn: true, data: profile.getImageUrl()})
  } else {
    emitter({isSignedIn: false})
  }
})

const userChannelFactory = () => eventChannel(e => {
  emitter = (...args) => [...args, END].forEach(e)
  return () => {}
})

function* handleUserSignInSuccess({payload: googleUser}) {
  const profile = googleUser.getBasicProfile()
  yield put(userGetSuccess(profile.getImageUrl()))
}

function* userSignOut() {
  const auth2 = window.gapi.auth2.getAuthInstance()
  yield call(auth2.signOut.bind(auth2))
  yield put(userSignOutSuccess())
}

function* handleGapiLoad() {
  const chan = yield call(userChannelFactory)
  try {
    while (true) {
      const {isSignedIn, data} = yield take(chan)
      if (isSignedIn) yield put(userGetSuccess(data))
      else yield put(userNotSignedIn())
    }
  } finally {
    // nothing
  }
}

function* watchUserSignInSuccess() {
  yield takeLatest(userSignInSuccess, handleUserSignInSuccess)
}

function* watchUserSignOutRequest() {
  yield takeEvery(userSignOutRequest, userSignOut)
}

export default function* userSaga() {
  yield all([
    handleGapiLoad,
    watchUserSignInSuccess,
    watchUserSignOutRequest,
  ].map(fork))
}
