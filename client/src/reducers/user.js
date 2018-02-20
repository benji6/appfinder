import {handleActions} from 'redux-actions'
import {
  userGetSuccess,
  userNotSignedIn,
  userSignOutSuccess,
} from '../actions'

const initialState = {
  id: null,
  imageUrl: null,
  isLoading: true,
  isSignedIn: false,
}

export default handleActions({
  [userGetSuccess]: (state, {payload}) => ({...payload, isLoading: false, isSignedIn: true}),
  [userNotSignedIn]: state => ({...state, isLoading: false}),
  [userSignOutSuccess]: ({isLoading}) => ({
    ...initialState,
    isLoading,
  }),
}, initialState)
