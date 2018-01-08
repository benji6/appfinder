import {createAction} from 'redux-actions'

export const appsRequest = createAction('APPS_REQUEST')
export const appsRequestFail = createAction('APPS_REQUEST_FAIL')
export const appsRequestSuccess = createAction('APPS_REQUEST_SUCCESS')
export const tagsRequest = createAction('TAGS_REQUEST')
export const tagsRequestFail = createAction('TAGS_REQUEST_FAIL')
export const tagsRequestSuccess = createAction('TAGS_REQUEST_SUCCESS')
export const tagsToggleSelectedTag = createAction('TAGS_TOGGLE_SELECTED_TAG')
