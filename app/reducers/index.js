import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes, * as fromRecipes from './recipes';

const RootReducer = combineReducers(
    {
        recipes,
        form: formReducer,
    }
);

export default RootReducer;

export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipes);
export const getIsFetching = (state) => fromRecipes.getIsFetching(state.recipes);
export const getErrorMessage = (state) => fromRecipes.getErrorMessage(state.recipes);
