import { channel } from 'redux-saga';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import { v4 } from 'node-uuid';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';


export function *addRecipe(){
    const formData = yield select(state => state.form.form.values);
    const addRecipeChannel = channel();
    const addRecipe = addRecipeWrapper(addRecipeChannel);

    let updates = {};
    let ingredientsIds = [];
    formData.ingredients.map(ingredient => {
        let ingredientId = v4()
        updates['/entities/ingredients/' + ingredientId] = ingredient;
        ingredientsIds.push(ingredientId)
    })
    let recipeId = v4()
    const recipe = {
        id: recipeId,
        title: formData.title,
        directions: formData.directions,
        servings: formData.servings,
        ingredients: ingredientsIds,
    }
    updates['/entities/recipes/' + recipeId] = recipe;
    firebaseApp.database().ref().update(updates, addRecipe);

    while (true) {
        const action = yield take(addRecipeChannel);
        yield put(action);
    }
}

function addRecipeWrapper(channel) {
    function addRecipe(snapshot) {
        if (!snapshot) {
            channel.put(actions.addRecipeSuccess());
        }
        // TODO test if error scenario works
        else {
            channel.put(actions.addRecipeFailure(snapshot.val()));
        }
    }
    return addRecipe;
}

export default function* watchAddRecipe() {
    yield takeEvery('ADD_RECIPE_REQUEST', addRecipe);
}
