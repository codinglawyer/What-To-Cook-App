const recipes = (state = [], action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return [
                ...state,
                action.recipeData,
            ];
        case 'DELETE_RECIPE':
            return state.filter(recipe => {
                return recipe.id !== action.id
            });
        case 'DISPLAY_RECIPE':
            let updatedRecipe = state.filter(recipe => {
                return recipe.id === action.recipeId
            });
            updatedRecipe[0].displayed = !updatedRecipe[0].displayed
            let otherRecipes = state.filter(recipe => {
                return recipe.id !== action.recipeId
            });
            return [...otherRecipes, updatedRecipe[0]]
        default:
            return state;
    }
};

export default recipes;

export const getRecipesList = (state) => state;
