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

export const fetchRecipes = (recipes) => ({
    type: 'FETCH_RECIPES',
    recipes,
});
