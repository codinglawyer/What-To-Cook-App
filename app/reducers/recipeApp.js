import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes, * as fromRecipes from './recipes';
import byIds from './byIds';
import displayRecipeForm, * as fromDisplayForm from './displayRecipeForm';

const RecipeApp = combineReducers(
    {
        byIds,
        recipes,
        displayRecipeForm,
        form: formReducer,
    }
);

export default RecipeApp;

export const getRecipesList = (state) => fromRecipes.getRecipesList(state.recipes);
export const getDisplayRecipeState = (state) => fromDisplayForm.getDisplayRecipeState(state.displayRecipeForm);
