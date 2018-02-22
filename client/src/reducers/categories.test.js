import reducer from './categories'

describe('categories reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allIds: [],
      byId: {},
      lastUpdated: null,
    })
  })
})
