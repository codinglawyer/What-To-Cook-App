import { put, takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from './api/index'
import * as actions from './actions/index'

export function fetchRecipesApi() {
    return api.fetchRecipes()
        .then(response => ({response}))
        .catch(error => ({error}))
}

function* fetchRecipes() {
    const { response, error } = yield call(fetchRecipesApi)
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

export default function* rootSaga() {
    yield [
        watchFetchRecipes()
    ]
}
