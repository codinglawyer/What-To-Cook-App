import { normalize } from 'normalizr';
import * as schema from './schema';

export const fetchRecipesRequest = () => ({
    type: 'FETCH_RECIPES_REQUEST',
});

export const fetchRecipesSuccess = ({response}) => {
    console.log(normalize(response, schema.arrayOfRecipes));
    return {
    type: 'FETCH_RECIPES_SUCCESS',
    payload: normalize(response, schema.arrayOfRecipes),
}};

export const fetchRecipesFailure = ({error}) => ({
    type: 'FETCH_RECIPES_FAILURE',
    payload: error.message,
});


export const addRecipeRequest = () => ({
    type: 'ADD_RECIPE_REQUEST',
});

export const addRecipeSuccess = ({response}) => ({
    type: 'ADD_RECIPE_SUCCESS',
    payload: normalize(response, schema.recipe),
});

export const addRecipeFailure = ({error}) => ({
    type: 'ADD_RECIPE_FAILURE',
    payload: error.message,
});


export const deleteRecipeRequest = () => ({
    type: 'DELETE_RECIPE_REQUEST',
});

export const deleteRecipeSuccess = ({response}) => ({
    type: 'DELETE_RECIPE_SUCCESS',
    payload: normalize(response, schema.arrayOfRecipes),
});

export const deleteRecipeFailure = ({error}) => ({
    type: 'DELETE_RECIPE_FAILURE',
    payload: error.message,
});


export const loadRecipeToForm = ({displayedRecipeId}) => ({
    type: 'LOAD_RECIPE_TO_FORM',
    payload: displayedRecipeId,
})
