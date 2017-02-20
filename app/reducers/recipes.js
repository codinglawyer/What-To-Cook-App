import { combineReducers } from 'redux';

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
        case 'FETCH_RECIPES':
            let newState = {};
            for(let key in action.recipes){
                newState[action.recipes[key].id] = action.recipes[key]
            }
            return newState
        case 'ADD_RECIPE':
            return {
                ...state,
                [action.recipeData.id]: action.recipeData
            };
        case 'DELETE_RECIPE':
            return state.filter(recipe => {
                return recipe.id !== action.id
            });
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
        case 'FETCH_RECIPES':
            return action.recipes.map(recipe => recipe.id)
        case 'ADD_RECIPE':
            return [...state, action.recipeData.id];
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


