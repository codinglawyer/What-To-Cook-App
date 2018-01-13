/* non-memoized selector version */
/*
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

const getAllRecipesHelper = recipesEntity =>{
  console.time("ALL")
  return g(recipesEntity, 'allIds').map(id => recipesEntity.byId[id])}
export const getAllRecipes = state =>{
  console.timeEnd("ALL")
  return getAllRecipesHelper(getRecipesFromState(state))}

const getRecipeHelper = (recipesEntity, recipeId) => {
  return g(recipesEntity, 'byId')[recipeId]
}
export const getRecipe = (state, recipeId) =>
  getRecipeHelper(getRecipesFromState(state), recipeId)

const getFromState = (state, name) => g(state, name)
export const getAllIngredients = state =>{
  return getFromState(state, 'ingredientsEntity')
}
*/
