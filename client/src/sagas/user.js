import {eventChannel, END} from 'redux-saga'
import {all, call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
  userGetSuccess,
  userNotSignedIn,
  userSignInSuccess,
  userSignOutRequest,
  userSignOutSuccess,
} from '../actions'
import {postGoogleSignIn} from '../api'

let emitter = null

window.handleGapiLoad = () => window.gapi.load('auth2', () => {
  const auth2 = window.gapi.auth2.init()
  if (auth2.isSignedIn.get()) {
    const googleUser = auth2.currentUser.get()
    const idToken = googleUser.getAuthResponse().id_token
    postGoogleSignIn(idToken)
      .then(user => emitter({isSignedIn: true, user}))
      .catch(() => emitter({isSignedIn: false}))
  } else {
    emitter({isSignedIn: false})
  }
})

const userChannelFactory = () => eventChannel(e => {
  emitter = (...args) => [...args, END].forEach(e)
  return () => {}
})

function* handleUserSignInSuccess({payload: googleUser}) {
  const idToken = googleUser.getAuthResponse().id_token
  const user = yield call(postGoogleSignIn, idToken)
  yield put(userGetSuccess(user))
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
      const {isSignedIn, user} = yield take(chan)
      if (isSignedIn) yield put(userGetSuccess(user))
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
