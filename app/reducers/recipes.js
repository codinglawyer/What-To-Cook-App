import { combineReducers } from 'redux'
import { get as g, keys } from 'lodash'
import {
  FETCH_DATA_SUCCESS
} from '../actions/actionTypes'

export const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { recipes } = action.payload.entities
      return { ...recipes }
    default:
      return state
  }
}

export const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { recipes } = action.payload.entities
      const ids = keys(recipes)
      return ids
    default:
      return state
  }
}

const recipesEntity = combineReducers({
  byId,
  allIds
})

export default recipesEntity

const getFromState = (state, name) => g(state, name)
// selectors
export const getAllRecipes = state =>
  getFromState(state, 'allIds').map(id => state.byId[id])
export const getRecipe = (state, recipeId) =>
  getFromState(state, 'byId')[recipeId]
