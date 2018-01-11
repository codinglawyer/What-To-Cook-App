import { get as g } from 'lodash'

const getRecipesFromState = state => g(state, 'recipesEntity')
const getStatutesFromState = state => g(state, 'dataStatuses')
const getFromState = (state, name) => g(state, name)

// DataStatuses selectors
export const getIsDataFetchingHelper = state => {
  return getFromState(state, 'dataFetching')
}
export const getIsRecipeSavingHelper = state =>
  getFromState(state, 'recipeSaving')
export const getIsRecipeDeletingHelper = state =>
  getFromState(state, 'recipeDeleting')

export const getIsDataFetching = state =>
  getIsDataFetchingHelper(getStatutesFromState(state))
export const getIsRecipeSaving = state =>
  getIsRecipeSavingHelper(getStatutesFromState(state))
export const getIsRecipeDeleting = state =>
  getIsRecipeDeletingHelper(getStatutesFromState(state))

// Recipes selectors
export const getAllRecipesHelper = state =>
  getFromState(state, 'allIds').map(id => state.byId[id])
export const getRecipeHelper = (state, recipeId) =>
  getFromState(state, 'byId')[recipeId]

export const getAllRecipes = state =>
  getAllRecipesHelper(getRecipesFromState(state))
export const getRecipe = (state, recipeId) =>
  getRecipeHelper(getRecipesFromState(state), recipeId)
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
export const getAllIngredientsHelper = state => state

export const getAllIngredients = state =>
  getAllIngredientsHelper(g(state, 'ingredientsEntity'))
