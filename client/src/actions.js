import {createAction} from 'redux-actions'

export const appsRequest = createAction('APPS_REQUEST')
export const appsRequestFail = createAction('APPS_REQUEST_FAIL')
export const appsRequestSuccess = createAction('APPS_REQUEST_SUCCESS')
export const searchQuerySet = createAction('SEARCH_QUERY_SET')
export const categoriesRequest = createAction('CATEGORIES_REQUEST')
export const categoriesRequestFail = createAction('CATEGORIES_REQUEST_FAIL')
export const categoriesRequestSuccess = createAction('CATEGORIES_REQUEST_SUCCESS')
export const categoriesToggleSelectedCategory = createAction('CATEGORIES_TOGGLE_SELECTED_CATEGORY')
