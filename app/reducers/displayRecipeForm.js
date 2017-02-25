const displayRecipeForm = (state = false, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE_FORM':
            return action.payload;
        case 'DISPLAY_RECIPE':
            return false;
        default:
            return state;
    }
};

export default displayRecipeForm;

export const getDisplayFormState = (state) => state.displayRecipeForm;
