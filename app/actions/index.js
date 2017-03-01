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


export const addRecipeRequest = () => ({
    type: 'ADD_RECIPE_REQUEST',
});

export const addRecipeSuccess = ({response}) => ({
    type: 'ADD_RECIPE_SUCCESS',
    payload: response,
});

export const addRecipeFailure = ({error}) => ({
    type: 'ADD_RECIPE_FAILURE',
    payload: error.message,
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

