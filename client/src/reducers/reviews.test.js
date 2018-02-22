import reducer from './reviews'

describe('reviews reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allIds: [],
      byId: {},
      isLoading: false,
    })
  })
})
