const displayRecipeForm = (state = true, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE_FORM':
            return action.payload;
        case 'DISPLAY_RECIPE':
            return true;
        default:
            return state;
    }
};

export default displayRecipeForm;

export const getDisplayFormState = (state) => state.displayRecipeForm;
