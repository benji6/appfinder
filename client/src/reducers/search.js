import {handleActions} from 'redux-actions'
import {searchQuerySet} from '../actions'

const initialState = {
  query: '',
}

export const querySelector = state => state.search.query

export default handleActions({
  [searchQuerySet]: (state, {payload}) => ({...state, query: payload}),
}, initialState)
