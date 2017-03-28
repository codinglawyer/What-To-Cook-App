import { channel } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';


export function *databaseUpdate(){
    const connectionStatusChannel = channel();
    const connectionStatus = connectionStatusWrapper(connectionStatusChannel);
    const connectionRef = firebaseApp.database().ref();
    connectionRef.on('value', connectionStatus);


    while (true) {
        const action = yield take(connectionStatusChannel);
        console.log("ACTION", action);
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

export default function* watchFetchData() {
    yield call(databaseUpdate);
}
