import { channel } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'
import firebaseApp from '../api/firebase'
import * as actions from '../actions/index'

export function * connectionStatusChange () {
    const connectionStatusChannel = channel()
    const connectionStatus = connectionStatusWrapper(connectionStatusChannel)
    const connectionRef = firebaseApp.database().ref('.info/connected')
    connectionRef.on('value', connectionStatus)

    while (true) {
        const action = yield take(connectionStatusChannel)
        yield put(action)
    }
}

function connectionStatusWrapper (channel) {
    function connectionStatus (snapshot) {
        if (snapshot.val() === true) {
            channel.put(actions.connected())
        } else {
            channel.put(actions.disconnected())
        }
    }

    return connectionStatus
}

export default function * watchConnectionStatus () {
    yield call(connectionStatusChange)
}
