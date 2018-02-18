import {handleActions} from 'redux-actions'
import {appGetSuccess} from '../actions'

const initialState = {
  categoryIds: [],
  rating: null,
}

export const appRatingSelector = state => state.app.rating

export default handleActions({
  [appGetSuccess]: (state, {payload}) => payload,
}, initialState)
