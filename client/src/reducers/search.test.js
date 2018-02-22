import reducer from './search'

describe('search reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false,
      query: '',
      results: {
        allIds: [],
        byId: {},
      },
    })
  })
})
