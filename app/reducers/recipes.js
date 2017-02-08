import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

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

const displayRecipeForm = (state = false, action) => {
    switch(action.type) {
        case 'DISPLAY_RECIPE_FORM':
            return action.isDisplayed
        default:
            return state;
    }
}


const RecipeApp = combineReducers(
        {
            recipes,
            displayRecipeForm,
            form: formReducer,
        }
    )

export default RecipeApp;
