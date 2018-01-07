import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import { get as g, keys } from 'lodash'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

export const byId = (state = Immutable({}), action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { recipes } = action.payload.entities
      return state.merge(recipes)
    default:
      return state
  }
}

export const allIds = (state = Immutable([]), action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { recipes } = action.payload.entities
      return Immutable(keys(recipes))
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
