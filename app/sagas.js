import { put, takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from './api/index'
import * as actions from './actions/index'
//
// export function* fetchRecipesApi() {
//     return api.fetchRecipes()
//         .then(response => ({response}))
//         .catch(error => ({error}))
// }
//
// function* fetchRecipes() {
//     const { response, error } = yield call(fetchRecipesApi)
//     if (response) {
//         yield put(actions.fetchRecipesSuccess({response}))
//     }
//     else {
//         yield put(actions.fetchRecipesFailure({error}))
//     }
// }
//
// export function* watchFetchRecipes() {
//     yield takeEvery('RECEIVE_RECIPES', fetchRecipes)
// }
//
// export default function* rootSaga() {
//     yield [
//         watchFetchRecipes()
//     ]
// }


export function* fetchRecipe() {
    try {
        const response =  yield api.fetchRecipes();
        yield put(actions.fetchRecipesSuccess({response}))
    }
    catch(error) {
        yield put(actions.fetchRecipesFailure(error))
    }
}

export function* watchFetchRecipes() {
    yield takeEvery('FETCH_RECIPES_REQUEST', fetchRecipe)
}

export default function* rootSaga() {
    yield [
        watchFetchRecipes()
    ]
}
