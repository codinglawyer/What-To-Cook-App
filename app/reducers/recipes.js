import { combineReducers } from 'redux'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      const { payload } = action
      return { ...payload.entities.recipes }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      const { payload } = action
      const ids = []
      for (const key in payload.entities.recipes) {
        ids.push(key)
      }
      return ids
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'IS_DATA_BEING_FETCHED':
      return true
    case 'FETCH_DATA_SUCCESS':
    case 'FETCH_DATA_FAILURE':
      return false
    default:
      return state
  }
}

// TODO test if the error works with Firebase
const errorMessage = (state = null, action) => {
  const { payload } = action
  switch (action.type) {
    case 'FETCH_DATA_FAILURE':
      return payload
    case 'IS_DATA_BEING_FETCHED':
    case 'FETCH_DATA_SUCCESS':
      return null
    default:
      return state
  }
}

const recipesEntity = combineReducers({
  byId,
  allIds,
  isFetching,
  errorMessage
})

export default recipesEntity

export const getAllRecipes = state => state.allIds.map(id => state.byId[id])
export const getRecipe = (state, recipeId) => state.byId[recipeId]
export const getIsFetching = state => state.isFetching
export const getErrorMessage = state => state.errorMessage
