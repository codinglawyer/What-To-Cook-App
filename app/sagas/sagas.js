import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as api from '../api/index';
import * as actions from '../actions/index';
import watchConnectionStatus from './databaseConnection';
import watchDatabaseUpdate from './databaseUpdate';
import watchAddRecipe from './addRecipe'
import firebaseApp from '../api/firebase';




function* deleteRecipe({ payload }) {
    firebaseApp.database().ref().remove('entities');


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
