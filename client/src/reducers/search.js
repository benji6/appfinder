import {handleActions} from 'redux-actions'
import {
  searchQueryClear,
  searchQuerySet,
} from '../actions'

const initialState = {
  query: '',
}

export const searchQuerySelector = state => state.search.query

export default handleActions({
  [searchQueryClear]: state => ({...state, query: initialState.query}),
  [searchQuerySet]: (state, {payload}) => ({...state, query: payload}),
}, initialState)
