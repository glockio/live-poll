import React from 'react-native';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux/native';
import rootReducer from './src/reducers/root.reducer';
import App from './src/app';
import thunk from 'redux-thunk';
import Firebase from 'firebase';

import * as UserActions from './src/actions/user.actions.js';


const {AppRegistry, Component} = React; // React Must be defined;

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

store.dispatch(UserActions.setUserId());
store.dispatch(UserActions.loadVotingHistory());
// Init Store with root reducer
const store = createStoreWithMiddleware(rootReducer);

// Connect to Firebase
const rootRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');

// Login User
rootRef.authAnonymously(function(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        store.dispatch({type: "SET_USER_ID", userId: authData.uid});
    }
});

console.log(store.getState().toJS());

class LivePollParticipant extends Component {

    // Injects redux store to all children
    render(){
        return(
            <Provider store={store}>
              { () => <App/> }
            </Provider>
        );
    }
}

AppRegistry.registerComponent('LivePollParticipant', () => LivePollParticipant);
