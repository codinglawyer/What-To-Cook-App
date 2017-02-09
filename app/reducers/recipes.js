import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return {
                ...state,
                [action.recipeData.id]: action.recipeData
            };
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

const allIds = (state = [], action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return [...state, action.recipeData.id]
        default:
            return state;
    }
};

const recipes = combineReducers({
    byId,
    allIds,
})

export default recipes;

export const getAllRecipes = (state) =>
    state.allIds.map(id => state.byId[id]);

