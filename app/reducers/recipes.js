import Immutable from 'seamless-immutable'
import createReducer from '../utils/createReducer'
import { combineReducers } from 'redux'
import { get as g, keys } from 'lodash'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

export const byId = createReducer(
  {},
  {
    [FETCH_DATA_SUCCESS] (state, action) {
      const { recipes } = action.payload.entities
      return state.merge(recipes)
    }
  }
)

export const allIds = createReducer([], {
  [FETCH_DATA_SUCCESS](state, action) {
    const { recipes } = action.payload.entities
    return Immutable(keys(recipes))
  }
})

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
