import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const recipe = (state = [], action) => {
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
        default:
            return state;
    }
};

const displayRecipeForm = (state = false, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE_FORM':
            return action.isDisplayed
        default:
            return state;
    }
}


const Recipes = combineReducers(
        {
            recipe,
            displayRecipeForm,
            form: formReducer,
        }
    )
export default Recipes;
