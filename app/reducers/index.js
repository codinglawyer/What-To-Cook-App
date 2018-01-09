import createReducer from '../utils/createReducer'
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

export const connectionStatus = createReducer(false, {
  [FIREBASE_CONNECTED] (state, action) {
    return true
  },
  [FIREBASE_DISCONNECTED] (state, action) {
    return false
  }
})

const RootReducer = combineReducers({
  recipesEntity,
  ingredientsEntity,
  connectionStatus,
  dataStatuses,
  form: formReducer
})

export default RootReducer

const getRecipesFromState = state => g(state, 'recipesEntity')
const getStatutesFromState = state => g(state, 'dataStatuses')

// DataStatuses selectors
export const getIsDataFetching = state =>
  fromDataStatuses.getIsDataFetching(getStatutesFromState(state))
export const getIsRecipeSaving = state =>
  fromDataStatuses.getIsRecipeSaving(getStatutesFromState(state))
export const getIsRecipeDeleting = state =>
  fromDataStatuses.getIsRecipeDeleting(getStatutesFromState(state))

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
