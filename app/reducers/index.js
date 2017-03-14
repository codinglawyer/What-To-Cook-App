import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipesEntity, * as fromRecipes from './recipes';
import ingredientsEntity, * as fromIngredients from './ingredients';
import { cloneDeep } from 'lodash';

const RootReducer = combineReducers({
    recipesEntity,
    ingredientsEntity,
    form: formReducer,
});

export default RootReducer;

export const getAllRecipes = state => fromRecipes.getAllRecipes(state.recipesEntity);
export const getRecipe = (state, recipeId) => fromRecipes.getRecipe(state.recipesEntity, recipeId);
export const getIsFetching = state => fromRecipes.getIsFetching(state.recipesEntity);
export const getErrorMessage = state => fromRecipes.getErrorMessage(state.recipesEntity);
export const getAllIngredients = state => fromIngredients.getAllIngredients(state.ingredientsEntity);
export const getCompleteRecipes = (state, getRecipes, getIngredients) => {
    const recipes = getRecipes(state);
    const allIngredients = getIngredients(state);
    const relevantIngredients = recipes.map((recipe) => recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] })));
    const recipesWithIngredients = relevantIngredients.map((ing, i) => ({ ...recipes[i], ingredients: ing }));
    return recipesWithIngredients;
};

//todo refactor
export const getCompleteRecipe = (state, recipeId) => {
    let ingredients = state.ingredientsEntity;
    let recipes = state.recipesEntity.byId;
    let selectedRecipe = recipes[recipeId];
    let selected = cloneDeep(selectedRecipe);
    if(selected) {
        let relevantIngredients = selected.ingredients.map(ingredient => ingredients[ingredient]);
        selected.ingredients = relevantIngredients;
        return selected;
    }
};
