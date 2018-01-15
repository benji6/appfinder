import {handleActions} from 'redux-actions'
import {
  searchQueryClear,
  searchQuerySet,
  searchRequest,
  searchRequestSuccess,
  searchResultsClear,
} from '../actions'

const initialState = {
  isLoading: false,
  query: '',
  results: {
    allIds: [],
    byId: {},
  },
}

export const searchIsLoadingSelector = state => state.search.isLoading
export const searchResultsAppsSelector = ({
  search: {results: {allIds, byId}},
}) => allIds.map(id => byId[id])
export const searchQuerySelector = state => state.search.query

export default handleActions({
  [searchQueryClear]: state => ({...state, query: initialState.query}),
  [searchQuerySet]: (state, {payload}) => ({...state, query: payload}),
  [searchRequest]: state => ({...state, isLoading: true}),
  [searchRequestSuccess]: (state, {payload}) => {
    const allIds = []
    const byId = {}
    for (const app of payload) {
      const {id} = app
      allIds.push(id)
      byId[id] = app
    }
    return {...state, isLoading: false, results: {byId, allIds}}
  },
  [searchResultsClear]: state => ({...state, results: initialState.results}),
}, initialState)
