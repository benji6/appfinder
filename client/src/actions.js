import {createAction} from 'redux-actions'

export const appDetailsMount = createAction('APP_DETAILS_MOUNT')
export const appGetSuccess = createAction('APP_GET_SUCCESS')
export const categoriesGetSuccess = createAction('CATEGORIES_GET_SUCCESS')
export const categoryCaseGetSuccess = createAction('CATEGORY_CASE_GET_SUCCESS')
export const categoryCaseMount = createAction('CATEGORY_CASE_MOUNT')
export const searchQueryClear = createAction('SEARCH_QUERY_CLEAR')
export const searchQuerySet = createAction('SEARCH_QUERY_SET')
export const searchRequest = createAction('SEARCH_REQUEST')
export const searchRequestInitiate = createAction('SEARCH_REQUEST_INITIATE')
export const searchRequestFail = createAction('SEARCH_REQUEST_FAIL')
export const searchRequestSuccess = createAction('SEARCH_REQUEST_SUCCESS')
export const searchResultsClear = createAction('SEARCH_RESULTS_CLEAR')
