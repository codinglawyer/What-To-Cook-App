import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { fetchRecipes } from './api/index'
import * as actions from './actions/index'

export function* fetchRecipe() {
    const recipes =  yield fetchRecipes();
    yield put(actions.fetchRecipes(recipes))
}

export function* watchFetchRecipes() {
    yield takeEvery('RECIPES_ASYNC', fetchRecipe)
}

export default function* rootSaga() {
    yield [
        watchFetchRecipes()
    ]
}
