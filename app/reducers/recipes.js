import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const Recipe = (state = [], action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return [
                ...state,
                action.recipeData,
            ];
        case 'DELETE_RECIPE':
            return state.filter(recipe => {
                return recipe.id !== action.id
            })
        default:
            return state;
    }
};

const Recipes = combineReducers({Recipe, form: formReducer})
export default Recipes;
