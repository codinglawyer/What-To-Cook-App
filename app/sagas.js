import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { fetchRecipes } from './api/index'
import * as actions from './actions/index'

export function* fetchRecipe() {
    try {
        const recipes =  yield fetchRecipes();
        yield put(actions.fetchRecipesSuccess(recipes))
    }
    catch(error) {
        yield put(actions.fetchRecipesFailed(error))
    }
}

export function* watchFetchRecipes() {
    yield takeEvery('RECEIVE_RECIPES', fetchRecipe)
}

export default function* rootSaga() {
    yield [
        watchFetchRecipes()
    ]
}
