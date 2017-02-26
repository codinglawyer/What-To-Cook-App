import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes, * as fromRecipes from './recipes';
import displayRecipeForm, * as fromDisplayForm from './displayRecipeForm';
import displayedRecipe, * as fromDisplayedRecipe from './displayedRecipe'

const RootReducer = combineReducers(
    {
        recipes,
        displayedRecipe,
        displayRecipeForm,
        form: formReducer,
    }
);

export default RootReducer;

export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipes);
export const getDisplayFormState = (state) => fromDisplayForm.getDisplayFormState(state);
export const getDisplayedRecipe = (state) => fromDisplayedRecipe.getDisplayedRecipe(fromDisplayedRecipe.getDisplayedRecipeId(state), fromRecipes.getAllRecipes(state.recipes));
