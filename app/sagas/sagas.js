import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as api from '../api/index';
import * as actions from '../actions/index';
import watchConnectionStatus from './databaseConnection';
import watchDatabaseUpdate from './databaseUpdate';
import watchAddRecipe from './addRecipe'


export function deleteRecipeApi(recipeData) {
    return api.deleteRecipe(recipeData)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function* deleteRecipe({ payload }) {
    const { response, error } = yield call(deleteRecipeApi, payload);
    if (response) {
        yield put(actions.deleteRecipeSuccess({ response }));
    }
    else {
        yield put(actions.deleteRecipeFailure({ error }));
    }
}

export function* watchDeleteRecipe() {
    yield takeEvery('DELETE_RECIPE_REQUEST', deleteRecipe);
}


export default function* rootSaga() {
    yield [
        watchAddRecipe(),
        watchDeleteRecipe(),
        watchConnectionStatus(),
        watchDatabaseUpdate(),
    ];
}
