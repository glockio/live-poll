import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const initialState = Map({
  loading: false,
  authData: null,
});

export default function rootReducer(state=initialState, action) {

  console.log(`Calling ${action.type}...`);

  switch (action.type) {
    case "SET_LOADING": {
      // always need to return the new state
      return state.set('loading', action.loading);
    }
    case "SET_USER_ID": {
      console.log("setting auth data");

      var result =  state.set('userId', action.userId);
      console.log(result.toJS());
      return result;
    }
  }
  return state;
}
