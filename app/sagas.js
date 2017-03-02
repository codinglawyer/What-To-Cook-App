import { put, takeEvery, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from './api/index'
import * as actions from './actions/index'

export function fetchRecipesApi() {
    return api.fetchRecipes()
        .then(response => ({response}))
        .catch(error => ({error}))
}

function* fetchRecipes() {
    const { response, error } = yield call(fetchRecipesApi);
    if (response) {
        yield put(actions.fetchRecipesSuccess({response}))
    }
    else {
        yield put(actions.fetchRecipesFailure({error}))
    }
}

export function* watchFetchRecipes() {
    yield takeEvery('FETCH_RECIPES_REQUEST', fetchRecipes)
}



export function addRecipeApi(recipeData) {
    return api.addRecipe(recipeData)
        .then(response => ({response}))
        .catch(error => ({error}))
}

function* addRecipe() {
    const formData = yield select(state => state.form.form.values);
    const { response, error } = yield call(addRecipeApi, formData);
    if (response) {
        yield put(actions.addRecipeSuccess({response}))
    }
    else {
        yield put(actions.addRecipeFailure({error}))
    }
}

export function* watchAddRecipe() {
    yield takeEvery('ADD_RECIPE_REQUEST', addRecipe)
}


export function deleteRecipeApi(recipeData) {
    return api.deleteRecipe(recipeData)
        .then(response => ({response}))
        .catch(error => ({error}))
}

function* deleteRecipe() {
    const recipeId = yield select(state => state.displayedRecipe);
    const { response, error } = yield call(deleteRecipeApi, recipeId);
    if (response) {
        yield put(actions.deleteRecipeSuccess({response}))
    }
    else {
        yield put(actions.deleteRecipeFailure({error}))
    }
}

export function* watchDeleteRecipe() {
    yield takeEvery('DELETE_RECIPE_REQUEST', deleteRecipe)
}

export default function* rootSaga() {
    yield [
        watchFetchRecipes(),
        watchAddRecipe(),
        watchDeleteRecipe(),
    ]
}
