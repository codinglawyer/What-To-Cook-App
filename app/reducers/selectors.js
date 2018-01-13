import { get as g, curry } from 'lodash'
import { createSelector } from 'reselect'

const getRecipesFromState = state => g(state, 'recipesEntity')
const getStatutesFromState = state => g(state, 'dataStatuses')

// DataStatuses selectors
const getIsDataFetchingHelper = dataStatuses => g(dataStatuses, 'dataFetching')
const getIsRecipeSavingHelper = dataStatuses => g(dataStatuses, 'recipeSaving')
const getIsRecipeDeletingHelper = dataStatuses =>
  g(dataStatuses, 'recipeDeleting')

export const getIsDataFetching = state =>
  getIsDataFetchingHelper(getStatutesFromState(state))
export const getIsRecipeSaving = state =>
  getIsRecipeSavingHelper(getStatutesFromState(state))
export const getIsRecipeDeleting = state =>
  getIsRecipeDeletingHelper(getStatutesFromState(state))

// Ingredients selectors (memoized)
const getAllIngredientsHelper = curry((entity, state) => g(state, entity))
export const getAllIngredients = createSelector(
  getAllIngredientsHelper('ingredientsEntity'),
  ingredients => ingredients
)

// Recipes selectors (memoized)
// TODO: make it more functional
const getAllRecipesHelper = selector => state => {
  const recipesEntity = selector(state)
  return g(recipesEntity, 'allIds').map(id => recipesEntity.byId[id])
}
export const getAllRecipes = createSelector(
  getAllRecipesHelper(getRecipesFromState),
  recipes => recipes
)

const getRecipeHelper = selector => recipeId => state => {
  const recipesEntity = selector(state)
  return g(recipesEntity, 'byId')[recipeId]
}
export const getRecipe = createSelector(
  getRecipeHelper(getRecipesFromState),
  recipe => recipe
)

export const getCompleteRecipes = createSelector(
  [getAllRecipes, getAllIngredients],
  (recipes, allIngredients) => {
    const relevantIngredients = recipes.map(recipe =>
      recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] }))
    )
    const recipesWithIngredients = relevantIngredients.map((ing, i) => ({
      ...recipes[i],
      ingredients: ing
    }))
    return recipesWithIngredients
  }
)
