import {createAction} from 'redux-actions'

export const appsRequestFail = createAction('APPS_REQUEST_FAIL')
export const appsRequestSuccess = createAction('APPS_REQUEST_SUCCESS')
export const categoryCaseGetSuccess = createAction('CATEGORY_CASE_GET_SUCCESS')
export const categoryCaseMount = createAction('CATEGORY_CASE_MOUNT')
export const searchResultsClear = createAction('SEARCH_RESULTS_CLEAR')
export const searchQueryClear = createAction('SEARCH_QUERY_CLEAR')
export const searchQuerySet = createAction('SEARCH_QUERY_SET')
