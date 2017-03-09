import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipesEntity, * as fromRecipes from './recipes';
import ingredientsEntity, * as fromIngredients from './ingredients';

const RootReducer = combineReducers(
    {
        recipesEntity,
        ingredientsEntity,
        form: formReducer,
    }
);

export default RootReducer;

export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipesEntity);
export const getIsFetching = (state) => fromRecipes.getIsFetching(state.recipesEntity);
export const getErrorMessage = (state) => fromRecipes.getErrorMessage(state.recipesEntity);
