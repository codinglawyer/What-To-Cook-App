import { combineReducers } from 'redux'
import { get as g, keys } from 'lodash'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      const { recipes } = action.payload.entities
      return { ...recipes }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      const { recipes } = action.payload.entities
      const ids = keys(recipes)
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
  switch (action.type) {
    case 'FETCH_DATA_FAILURE':
      const { payload } = action
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

const getFromState = (state, name) => g(state, name)
// selectors
export const getAllRecipes = state =>
  getFromState(state, 'allIds').map(id => state.byId[id])
export const getRecipe = (state, recipeId) =>
  getFromState(state, 'byId')[recipeId]
export const getIsFetching = state => getFromState(state, 'isFetching')
export const getErrorMessage = state => getFromState(state, 'errorMessage')
