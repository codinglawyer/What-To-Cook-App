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

export const fetchRecipesSuccess = ({recipes}) => ({
    type: 'FETCH_RECIPES_SUCCESS',
    payload: recipes,
});

export const fetchRecipesFailed = ({error}) => ({
    type: 'FETCH_RECIPES_FAILED',
    payload: error,
});

export const receiveRecipes = () => ({
    type: 'RECEIVE_RECIPES',
});
