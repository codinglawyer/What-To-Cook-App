export const addRecipe = ({recipeData}) => ({
    type: 'ADD_RECIPE',
    payload: recipeData,
});

export const deleteRecipe = ({displayedRecipeId}) => ({
    type: 'DELETE_RECIPE',
    payload: displayedRecipeId,
});

export const displayRecipeForm = ({isFormDisplayed}) => ({
    type: 'DISPLAY_RECIPE_FORM',
    payload: isFormDisplayed,
});

export const displayRecipe = ({recipeId}) => ({
    type: 'DISPLAY_RECIPE',
    payload: recipeId,
});

export const fetchRecipesRequest = () => ({
    type: 'FETCH_RECIPES_REQUEST',
});

export const fetchRecipesSuccess = ({response}) => ({
    type: 'FETCH_RECIPES_SUCCESS',
    payload: response,
});

export const fetchRecipesFailure = ({error}) => ({
    type: 'FETCH_RECIPES_FAILURE',
    payload: error.message,
});
