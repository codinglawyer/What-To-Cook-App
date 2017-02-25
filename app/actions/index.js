export const addRecipe = (recipeData) => ({
    type: 'ADD_RECIPE',
    payload: recipeData,
});

export const deleteRecipe = (id) => ({
    type: 'DELETE_RECIPE',
    payload: id,
});

export const displayRecipeForm = (isDisplayed) => ({
    type: 'DISPLAY_RECIPE_FORM',
    payload: isDisplayed,
});

export const displayRecipe = (recipeId) => ({
    type: 'DISPLAY_RECIPE',
    payload: recipeId,
});

export const fetchRecipesSuccess = ({recipes}) => ({
    type: 'FETCH_RECIPES_SUCCESS',
    payload: recipes,
});

export const fetchRecipesFailed = (error) => ({
    type: 'FETCH_RECIPES_FAILED',
    payload: error,
});

export const receiveRecipes = () => ({
    type: 'RECEIVE_RECIPES',
});
