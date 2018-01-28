import {handleActions} from 'redux-actions'
import {categoriesGetSuccess} from '../actions'

const initialState = {
  allIds: [],
  byId: {},
  lastUpdated: null,
}

export const categoriesHaveLoadedSelector = state => Boolean(state.categories.lastUpdated)
export const categoriesLastUpdatedSelector = state => state.categories.lastUpdated

export default handleActions({
  [categoriesGetSuccess]: (state, {payload: categories}) => {
    const allIds = categories.map(({id}) => id)
    const byId = {}
    for (const category of categories) {
      byId[category.id] = category
    }
    return {allIds, byId, lastUpdated: Date.now()}
  },
}, initialState)
