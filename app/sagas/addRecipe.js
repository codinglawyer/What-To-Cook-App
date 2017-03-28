import { channel } from 'redux-saga';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import { v4 } from 'node-uuid';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';


export function *connectionStatusChange(){
    const formData = yield select(state => state.form.form.values);
    const connectionStatusChannel = channel();
    const connectionStatus = connectionStatusWrapper(connectionStatusChannel);

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
    firebaseApp.database().ref().update(updates);

    while (true) {
        const action = yield take(connectionStatusChannel);
        yield put(action);
    }
}

function connectionStatusWrapper(channel) {
    function connectionStatus(snapshot) {
        if (snapshot.val() === true) {
            channel.put(actions.fetchDataSuccess(snapshot.val()));
        }
        else {
            channel.put(actions.fetchDataSuccess(snapshot.val()));
        }
    }
    return connectionStatus;
}

export default function* watchAddRecipe() {
    yield takeEvery('ADD_RECIPE_REQUEST', connectionStatusChange);
}
