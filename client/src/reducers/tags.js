import {handleActions} from 'redux-actions'
import {
  tagsToggleSelectedTag,
  tagsRequestSuccess,
} from '../actions'

const initialState = {
  byId: null,
  ids: null,
  selectedTagIds: [],
}

export const selectedTagIdsSelector = state => state.tags.selectedTagIds
export const tagIdsSelector = state => state.tags.ids
export const tagsByIdSelector = state => state.tags.byId

export default handleActions({
  [tagsRequestSuccess]: (state, {payload}) => {
    const ids = []
    const byId = {}
    for (const tag of payload) {
      const {id} = tag
      ids.push(id)
      byId[id] = tag
    }
    return Object.assign({}, state, {byId, ids})
  },
  [tagsToggleSelectedTag]: (state, {payload}) => {
    const s = new Set(state.selectedTagIds)
    if (s.has(payload)) s.delete(payload)
    else s.add(payload)
    return {
      ...state,
      selectedTagIds: [...s],
    }
  },
}, initialState)
