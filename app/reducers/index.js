import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { get as g } from 'lodash'
import {
  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE
} from '../actions/actionTypes'
import recipesEntity, * as fromRecipes from './recipes'
import ingredientsEntity, * as fromIngredients from './ingredients'

const connectionStatus = (state = false, action) => {
  switch (action.type) {
    case FIREBASE_CONNECTED:
      return true
    case FIREBASE_DISCONNECTED:
      return false
    default:
      return state
  }
}

const recipeSaving = (state = false, action) => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return { saving: true, error: '' }
    case ADD_RECIPE_SUCCESS:
      return { saving: false, error: '' }
    case ADD_RECIPE_FAILURE:
      const { error } = action.payload
      return { saving: false, error }
    default:
      return state
  }
}

const RootReducer = combineReducers({
  recipesEntity,
  ingredientsEntity,
  connectionStatus,
  recipeSaving,
  form: formReducer
})

export default RootReducer

const getRecipesFromState = state => g(state, 'recipesEntity')

// selectors
export const getAllRecipes = state =>
  fromRecipes.getAllRecipes(getRecipesFromState(state))

export const getRecipe = (state, recipeId) =>
  fromRecipes.getRecipe(getRecipesFromState(state), recipeId)

export const getIsFetching = state =>
  fromRecipes.getIsFetching(getRecipesFromState(state))

export const getErrorMessage = state =>
  fromRecipes.getErrorMessage(getRecipesFromState(state))

export const getAllIngredients = state =>
  fromIngredients.getAllIngredients(g(state, 'ingredientsEntity'))

export const getCompleteRecipes = (state, getRecipes, getIngredients) => {
  const recipes = getRecipes(state)
  const allIngredients = getIngredients(state)
  const relevantIngredients = recipes.map(recipe =>
    recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] }))
  )
  const recipesWithIngredients = relevantIngredients.map((ing, i) => ({
    ...recipes[i],
    ingredients: ing
  }))
  return recipesWithIngredients
}
