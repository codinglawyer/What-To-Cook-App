import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipesEntity, * as fromRecipes from './recipes';
import ingredientsEntity, * as fromIngredients from './ingredients';
import { cloneDeep } from 'lodash';

const RootReducer = combineReducers(
    {
        recipesEntity,
        ingredientsEntity,
        form: formReducer,
    }
);

export default RootReducer;

export const getAllRecipes = state => fromRecipes.getAllRecipes(state.recipesEntity);
export const getIsFetching = state => fromRecipes.getIsFetching(state.recipesEntity);
export const getErrorMessage = state => fromRecipes.getErrorMessage(state.recipesEntity);
export const getAllIngredients = state => fromIngredients.getAllIngredients(state.ingredientsEntity);


//todo refactor

export const getCompleteRecipes = (state, getRecipes, getIngredients) => {
    let recipes = getRecipes(state);
    let recipesWithIngredients = cloneDeep(recipes);
    let allIngredients = getIngredients(state);
    let relevantIngredients = recipes.map((recipe) => recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] })));
    relevantIngredients.map((ing, i) => recipesWithIngredients[i].ingredients = ing);
    return recipesWithIngredients;
};

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
