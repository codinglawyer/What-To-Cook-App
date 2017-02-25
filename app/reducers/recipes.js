import { combineReducers } from 'redux';
import { omit } from 'lodash';

// const updateRecipeDisplayState = (state, action) => {
//     switch(action.type) {
//         case 'DISPLAY_RECIPE':
//             return {
//                 ...state,
//                 displayed: !state.displayed
//             };
//         default:
//             return state;
//     }
// };

const byId = (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            let newState = {};
            for(let key in action.payload){
                newState[action.payload[key].id] = action.payload[key]
            }
            return newState;
        case 'ADD_RECIPE':
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case 'DELETE_RECIPE':
            return omit(state, action.payload);
        // case 'DISPLAY_RECIPE':
        //     return {
        //         ...state,
        //         [action.recipeId]: updateRecipeDisplayState(state[action.recipeId], action)
        //     };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            return action.payload.map(recipe => recipe.id);
        case 'ADD_RECIPE':
            return [...state, action.payload.id];
        case 'DELETE_RECIPE':
            return state.filter(id => id !== action.payload);
        default:
            return state;
    }
};


const recipes = combineReducers({
    byId,
    allIds,
});

export default recipes;

export const getAllRecipes = (state) =>
    state.allIds.map(id => state.byId[id]);

export const getDisplayedRecipe = (recipes) =>
    recipes.filter(recipe => recipe.displayed);


