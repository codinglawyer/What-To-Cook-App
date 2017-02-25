export const addRecipe = (recipeData) => ({
    type: 'ADD_RECIPE',
    recipeData,
});

export const deleteRecipe = (id) => ({
    type: 'DELETE_RECIPE',
    id,
});

export const displayRecipeForm = (isDisplayed) => ({
    type: 'DISPLAY_RECIPE_FORM',
    isDisplayed,
});

export const displayRecipe = (recipeId) => ({
    type: 'DISPLAY_RECIPE',
    recipeId,
});

export const fetchRecipesSuccess = (recipes) => ({
    type: 'FETCH_RECIPES_SUCCESS',
    recipes,
});

export const fetchRecipesFailed = (error) => ({
    type: 'FETCH_RECIPES_FAILED',
    error,
});

export const receiveRecipes = () => ({
    type: 'RECEIVE_RECIPES',
});
