import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import byIds from './byIds';
import displayRecipeForm from './displayRecipeForm';

const RecipeApp = combineReducers(
    {
        byIds,
        recipes,
        displayRecipeForm,
        form: formReducer,
    }
);

export default RecipeApp;
