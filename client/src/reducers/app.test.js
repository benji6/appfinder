import reducer from './app'
import {appGetRequest, appGetSuccess} from '../actions'

describe('app reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      categoryIds: [],
      isLoading: false,
      rating: null,
    })
  })

  test('appGetRequest', () => {
    expect(reducer({isLoading: false}, appGetRequest())).toEqual({
      isLoading: true,
    })
  })

  test('appGetSuccess', () => {
    expect(reducer({
      isLoading: true,
      not: 'changed',
    }, appGetSuccess({some: 'payload'}))).toEqual({
      isLoading: false,
      not: 'changed',
      some: 'payload',
    })
  })
})
