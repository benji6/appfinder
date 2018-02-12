import {createAction} from 'redux-actions'

export const appDetailsMount = createAction('APP_DETAILS_MOUNT')
export const appGetSuccess = createAction('APP_GET_SUCCESS')
export const categoriesGetSuccess = createAction('CATEGORIES_GET_SUCCESS')
export const categoryCaseGetSuccess = createAction('CATEGORY_CASE_GET_SUCCESS')
export const categoryCaseMount = createAction('CATEGORY_CASE_MOUNT')
export const reviewsGetRequest = createAction('REVIEWS_GET_REQUEST')
export const reviewsGetSuccess = createAction('REVIEWS_GET_SUCCESS')
export const searchQueryClear = createAction('SEARCH_QUERY_CLEAR')
export const searchQuerySet = createAction('SEARCH_QUERY_SET')
export const searchRequest = createAction('SEARCH_REQUEST')
export const searchRequestInitiate = createAction('SEARCH_REQUEST_INITIATE')
export const searchRequestFail = createAction('SEARCH_REQUEST_FAIL')
export const searchRequestSuccess = createAction('SEARCH_REQUEST_SUCCESS')
export const searchResultsClear = createAction('SEARCH_RESULTS_CLEAR')
export const userGetSuccess = createAction('USER_GET_SUCCESS')
export const userNotSignedIn = createAction('USER_NOT_SIGNED_IN')
export const userSignInSuccess = createAction('USER_SIGN_IN_SUCCESS')
export const userSignOutRequest = createAction('USER_SIGN_OUT_REQUEST', () => {})
export const userSignOutSuccess = createAction('USER_SIGN_OUT_SUCCESS')
