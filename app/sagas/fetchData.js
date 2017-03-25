import { channel } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';


export function *connectionStatusChange(){
    const connectionStatusChannel = channel();
    const connectionStatus = connectionStatusWrapper(connectionStatusChannel);
    const connectionRef = firebaseApp.database().ref().child(0);
    const recipeRef = connectionRef.child('react')
    connectionRef.on('value', connectionStatus);


    while (true) {
        const action = yield take(connectionStatusChannel);
        console.log("ACTION", action);
        yield put(action);
    }
}

function connectionStatusWrapper(channel) {
    function connectionStatus(snapshot) {
        console.log(snapshot.val())
        if (snapshot.val() === true) {
            channel.put(actions.connected());
        }
        else {
            channel.put(actions.fetchDataSuccess(snapshot.val()));
        }
    }

    return connectionStatus;
}

export default function *watchFetchData(){
    yield call(connectionStatusChange);
}
