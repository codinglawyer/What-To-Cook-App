import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes, * as fromRecipes from './recipes';
import displayRecipeForm, * as fromDisplayForm from './displayRecipeForm';

const RecipeApp = combineReducers(
    {
        recipes,
        displayRecipeForm,
        form: formReducer,
    }
);

export default RecipeApp;

export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipes);
export const getDisplayRecipeState = (state) => fromDisplayForm.getDisplayRecipeState(state.displayRecipeForm);
