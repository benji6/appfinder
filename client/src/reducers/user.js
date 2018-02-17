import {handleActions} from 'redux-actions'
import {
  userGetSuccess,
  userNotSignedIn,
  userSignOutSuccess,
} from '../actions'

const initialState = {
  imageUrl: null,
  isLoading: true,
  isSignedIn: false,
}

export const userImageUrlSelector = state => state.user.imageUrl
export const userIsLoadingSelector = state => state.user.isLoading
export const userIsSignedInSelector = state => state.user.isSignedIn
export const userNameSelector = state => state.user.name

export default handleActions({
  [userGetSuccess]: (state, {payload}) => ({...payload, isLoading: false, isSignedIn: true}),
  [userNotSignedIn]: state => ({...state, isLoading: false}),
  [userSignOutSuccess]: ({isLoading}) => ({
    ...initialState,
    isLoading,
  }),
}, initialState)
