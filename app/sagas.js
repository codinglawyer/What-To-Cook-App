import { put, takeEvery } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* fetchRecipes() {
    yield put({type: "FETCH_RECIPES"})
}

export function* watchFetchRecipes() {
    yield takeEvery('RECIPES_ASYNC', fetchRecipes)
}

export default function* rootSaga() {
    yield [
        helloSaga(),
        watchFetchRecipes()
    ]
}
// fetchRecipes().then(recipes =>
//     console.log(recipes)
// );
