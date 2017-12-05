import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { get as g } from 'lodash'
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  IS_DATA_BEING_FETCHED,
  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
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

const dataFetching = (state = { fetching: false, error: '' }, action) => {
  switch (action.type) {
    case IS_DATA_BEING_FETCHED:
      return { fetching: true, error: '' }
    case FETCH_DATA_SUCCESS:
      return { fetching: false, error: '' }
    case FETCH_DATA_FAILURE:
      const { error } = action.payload
      return { fetching: false, error }
    default:
      return state
  }
}

const recipeSaving = (state = { saving: false, error: '' }, action) => {
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

const recipeDeleting = (state = { deleting: false, error: '' }, action) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
      return { deleting: true, error: '' }
    case DELETE_RECIPE_SUCCESS:
      return { deleting: false, error: '' }
    case DELETE_RECIPE_FAILURE:
      const { error } = action.payload
      return { deleting: false, error }
    default:
      return state
  }
}

const RootReducer = combineReducers({
  recipesEntity,
  ingredientsEntity,
  connectionStatus,
  dataFetching,
  recipeSaving,
  recipeDeleting,
  form: formReducer
})

export default RootReducer

const getRecipesFromState = state => g(state, 'recipesEntity')
const getFromState = (state, name) => g(state, name)

// selectors
export const getIsDataFetching = state => getFromState(state, 'dataFetching')
export const getIsRecipeSaving = state => getFromState(state, 'recipeSaving')
export const getIsRecipeDeleting = state => getFromState(state, 'recipeDeleting')

export const getAllRecipes = state =>
  fromRecipes.getAllRecipes(getRecipesFromState(state))

export const getRecipe = (state, recipeId) =>
  fromRecipes.getRecipe(getRecipesFromState(state), recipeId)

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
