import React from 'react-native';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux/native';
import rootReducer from './src/reducers/root.reducer';
import App from './src/app';
import thunk from 'redux-thunk';
import * as UserActions from './src/actions/user.actions.js';

const {AppRegistry, Component} = React; // React Must be defined;

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

// Init Store with root reducer
const store = createStoreWithMiddleware(rootReducer);

// Connect to Firebase
store.dispatch(UserActions.setUserId());


// store.dispatch(UserActions.clearVotingHistory());
store.dispatch(UserActions.loadVotingHistory());


console.log(store.getState().toJS());

class reactNativeTest extends Component {

  // Injects redux store to all children
  render(){
    return(
      <Provider store={store}>
        { () => <App/> }
      </Provider>
    );
  }
}

AppRegistry.registerComponent('reactNativeTest', () => reactNativeTest);
