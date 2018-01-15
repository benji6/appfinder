import {createAction} from 'redux-actions'

export const categoryCaseGetSuccess = createAction('CATEGORY_CASE_GET_SUCCESS')
export const categoryCaseMount = createAction('CATEGORY_CASE_MOUNT')
export const searchQueryClear = createAction('SEARCH_QUERY_CLEAR')
export const searchQuerySet = createAction('SEARCH_QUERY_SET')
export const searchRequest = createAction('SEARCH_REQUEST')
export const searchRequestFail = createAction('SEARCH_REQUEST_FAIL')
export const searchRequestSuccess = createAction('SEARCH_REQUEST_SUCCESS')
export const searchResultsClear = createAction('SEARCH_RESULTS_CLEAR')
