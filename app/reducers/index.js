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
export const getAllIngredients = state => fromIngredients.getAllIngredients(state.ingredientsEntity);

export const getCompleteRecipes = (state, getRecipes, getIngredients) => {
    let recipes = getRecipes(state);
    let allIngredients = getIngredients(state);
    let relevantIngredients = recipes.map((recipe) => recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] })));
    relevantIngredients.map((ing, i) => recipes[i].ingredients = ing);
    return recipes;
}
