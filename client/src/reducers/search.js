import {handleActions} from 'redux-actions'
import {
  searchQueryClear,
  searchQuerySet,
  searchRequestInitiate,
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

export default handleActions({
  [searchQueryClear]: state => ({...state, query: initialState.query}),
  [searchQuerySet]: (state, {payload}) => ({
    ...state,
    query: payload,
    results: (payload ? state : initialState).results,
  }),
  [searchRequestInitiate]: state => ({...state, isLoading: true}),
  [searchRequestSuccess]: (state, {payload}) => {
    const allIds = []
    const byId = {}
    for (const app of payload) {
      const {id} = app
      allIds.push(id)
      byId[id] = app
    }
    return {...state, isLoading: false, results: {allIds, byId}}
  },
  [searchResultsClear]: state => ({
    ...state,
    query: initialState.query,
    results: initialState.results,
  }),
}, initialState)
