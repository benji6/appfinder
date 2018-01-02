export const APPS_REQUEST = 'APPS_REQUEST'
export const APPS_REQUEST_FAIL = 'APPS_REQUEST_FAIL'
export const APPS_REQUEST_SUCCESS = 'APPS_REQUEST_SUCCESS'
export const TAGS_REQUEST = 'TAGS_REQUEST'
export const TAGS_REQUEST_FAIL = 'TAGS_REQUEST_FAIL'
export const TAGS_REQUEST_SUCCESS = 'TAGS_REQUEST_SUCCESS'

export const appsRequest = () => ({type: APPS_REQUEST})
export const appsRequestSuccess = payload => ({payload, type: APPS_REQUEST_SUCCESS})
export const appsRequestFail = payload => ({payload, type: APPS_REQUEST_FAIL})
export const tagsRequest = () => ({type: TAGS_REQUEST})
export const tagsRequestSuccess = payload => ({payload, type: TAGS_REQUEST_SUCCESS})
export const tagsRequestFail = payload => ({payload, type: TAGS_REQUEST_FAIL})
