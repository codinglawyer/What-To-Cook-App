const displayedRecipe = (state = false, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE':
            if(action.payload === state){
                return false;
            }
            return action.payload;
        case 'DISPLAY_RECIPE_FORM':
            return false;
        default:
            return state;
    }
};

export default displayedRecipe;

export const getDisplayedRecipeId = (state) =>
    state.displayedRecipe;

export const getDisplayedRecipe = (displayedRecipeId, recipes) =>
    recipes.filter(recipe => recipe.id === displayedRecipeId);
