import { channel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';


export function *databaseUpdate(){
    const databaseUpdateChannel = channel();
    const databaseUpdate = databaseUpdateWrapper(databaseUpdateChannel);
    const connectionRef = firebaseApp.database().ref();
    connectionRef.on('value', databaseUpdate);


    while (true) {
        const action = yield take(databaseUpdateChannel);
        console.log("ACTION", action);
        yield put(action);
    }
}

function databaseUpdateWrapper(channel) {
    function databaseUpdate(snapshot) {
        if (snapshot.val() === true) {
            channel.put(actions.fetchDataSuccess(snapshot.val()));
        }
        else {
            channel.put(actions.fetchDataSuccess(snapshot.val()));
        }
    }
    return databaseUpdate;
}

export default function* watchDatabaseUpdate() {
    yield call(databaseUpdate);
}
