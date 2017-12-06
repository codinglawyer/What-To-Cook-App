import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { get as g } from 'lodash'
import {
  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED
} from '../actions/actionTypes'
import recipesEntity, * as fromRecipes from './recipes'
import ingredientsEntity, * as fromIngredients from './ingredients'
import dataStatuses, * as fromDataStatuses from './dataStatuses'

export const connectionStatus = (state = false, action) => {
  switch (action.type) {
    case FIREBASE_CONNECTED:
      return true
    case FIREBASE_DISCONNECTED:
      return false
    default:
      return state
  }
}

const RootReducer = combineReducers({
  recipesEntity,
  ingredientsEntity,
  connectionStatus,
  dataStatuses,
  form: formReducer
})

export default RootReducer

const getRecipesFromState = state => g(state, 'recipesEntity')

// DataStatuses selectors
export const getIsDataFetching = state =>
  fromDataStatuses.getIsDataFetching(g(state, 'dataStatuses'))
export const getIsRecipeSaving = state =>
  fromDataStatuses.getIsRecipeSaving(g(state, 'dataStatuses'))
export const getIsRecipeDeleting = state =>
  fromDataStatuses.getIsRecipeDeleting(g(state, 'dataStatuses'))

// Recipes selectors
export const getAllRecipes = state =>
  fromRecipes.getAllRecipes(getRecipesFromState(state))

export const getRecipe = (state, recipeId) =>
  fromRecipes.getRecipe(getRecipesFromState(state), recipeId)

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

// Ingredients selectors
export const getAllIngredients = state =>
fromIngredients.getAllIngredients(g(state, 'ingredientsEntity'))
