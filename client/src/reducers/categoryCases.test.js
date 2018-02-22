import reducer from './categoryCases'

describe('categoryCases reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })
})
