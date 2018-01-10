import {handleActions} from 'redux-actions'
import {
  categoriesToggleSelectedCategory,
  categoriesRequestSuccess,
} from '../actions'

const initialState = {
  byId: null,
  ids: null,
  selectedCategoryIds: [],
}

export const selectedCategoryIdsSelector = state => state.categories.selectedCategoryIds
export const categoryIdsSelector = state => state.categories.ids
export const categoriesByIdSelector = state => state.categories.byId

export default handleActions({
  [categoriesRequestSuccess]: (state, {payload}) => {
    const ids = []
    const byId = {}
    for (const category of payload) {
      const {id} = category
      ids.push(id)
      byId[id] = category
    }
    return {...state, byId, ids}
  },
  [categoriesToggleSelectedCategory]: (state, {payload}) => {
    const s = new Set(state.selectedCategoryIds)
    if (s.has(payload)) s.delete(payload)
    else s.add(payload)
    return {
      ...state,
      selectedCategoryIds: [...s],
    }
  },
}, initialState)
