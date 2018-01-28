import {handleActions} from 'redux-actions'
import {appGetSuccess} from '../actions'

const initialState = {
  categoryIds: [],
}

export default handleActions({
  [appGetSuccess]: (state, {payload}) => payload,
}, initialState)