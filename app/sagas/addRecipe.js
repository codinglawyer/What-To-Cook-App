import { channel } from 'redux-saga';
import { put, takeEvery, take, select } from 'redux-saga/effects';
import { v4 } from 'node-uuid';
import firebaseApp from '../api/firebase';
import * as actions from '../actions/index';
import * as schema from '../actions/schema';
import { normalize } from 'normalizr';



export function *connectionStatusChange(){
    const formData = yield select(state => state.form.form.values);
    console.log("FORMDATA", formData);
    const connectionStatusChannel = channel();
    const connectionStatus = connectionStatusWrapper(connectionStatusChannel);
    //const connectionRef = firebaseApp.database().ref();
    //connectionRef.on('value', connectionStatus);

    // Get a key for a new Post.
    formData.id = v4()
    formData.ingredients[0].id = v4()
    const normalizedData = normalize(formData, schema.recipe)
    console.log("NORM", normalizedData);

    var newPostKey = firebaseApp.database().ref().child('entities').push().key
    const connectionRef = firebaseApp.database().ref().child('entities');
    const newKey = v4()
    console.log("CONNEC", connectionRef);

    var updates = {};
    updates['/entities/ingredients/' + formData.ingredients[0].id] = normalizedData.entities.ingredients[formData.ingredients[0].id];
    updates['/entities/recipes/' + formData.id] = normalizedData.entities.recipes[formData.id];
    updates['/result/' + 3] = formData.id
    firebaseApp.database().ref().update(updates);

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

export default function* watchAddRecipe() {
    yield takeEvery('ADD_RECIPE_REQUEST', connectionStatusChange);
}
