const displayRecipeForm = (state = false, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE_FORM':
            return action.isDisplayed;
        default:
            return state;
    }
};

export default displayRecipeForm;

export const getDisplayFormState = (state) => state.displayRecipeForm;
