import {handleActions} from 'redux-actions'
import {appGetSuccess} from '../actions'

const initialState = {
  categoryIds: [],
  rating: null,
}

export default handleActions({
  [appGetSuccess]: (state, {payload}) => payload,
}, initialState)
