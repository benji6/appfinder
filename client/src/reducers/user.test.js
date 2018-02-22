import reducer from './user'

describe('user reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      id: null,
      imageUrl: null,
      isLoading: true,
      isSignedIn: false,
    })
  })
})
