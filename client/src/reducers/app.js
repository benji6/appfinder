import {handleActions} from 'redux-actions'
import {appGetRequest, appGetSuccess} from '../actions'

const initialState = {
  categoryIds: [],
  isLoading: false,
  rating: null,
}

export default handleActions({
  [appGetRequest]: state => ({...state, isLoading: true}),
  [appGetSuccess]: (state, {payload}) => ({...state, ...payload, isLoading: false}),
}, initialState)
