import {handleActions} from 'redux-actions'
import {
  userGetSuccess,
  userNotSignedIn,
  userSignOutSuccess,
} from '../actions'

const initialState = {
  imageUrl: null,
  isSignedIn: false,
  isLoading: true,
}

export const userImageUrlSelector = state => state.user.imageUrl
export const userIsLoadingSelector = state => state.user.isLoading
export const userIsSignedInSelector = state => state.user.isSignedIn

export default handleActions({
  [userGetSuccess]: (state, {payload}) => ({imageUrl: payload, isLoading: false, isSignedIn: true}),
  [userNotSignedIn]: state => ({...state, isLoading: false}),
  [userSignOutSuccess]: state => ({...state, imageUrl: null, isSignedIn: false}),
}, initialState)
