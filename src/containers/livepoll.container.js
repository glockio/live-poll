import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import * as actions from '../actions/loading.actions';
import {Map, Seq, List,OrderedMap, Record} from 'immutable';
import Firebase from 'firebase';
const {Navigator, Text, View, StyleSheet, Component, TouchableHighlight} = React;

var {Platform} = React;
var PollComponent = require('../components/poll');

class LivePollContainer extends Component {

  componentDidMount() {
    const {fireRef} = this.props;
    this.props.getOpenPoll(fireRef);

    fireRef.child('openPollId').on('child_changed', (snapShot) => {
      const value = snapShot.val();
      this.props.getOpenPoll(fireRef);
    });

    fireRef.child('votes').on('child_changed', (snapShot) => {
      const value = snapShot.val();
      this.props.getOpenPoll(fireRef);
    });
  }

  render(){
    return <PollComponent navigator={this.props.navigator} openPoll={this.props.openPoll}/>;
  }
}

LivePollContainer.defaultProps = { openPoll: Map({}) };

const mapReduxStoreToProps = (reduxStore) => {
    const countRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');
    const openPollId = reduxStore.get('openPollId');

    return {
        fireRef: countRef,
        loading: reduxStore.get('loading'),
        error: reduxStore.get('error'),
        openPoll: reduxStore.get('polls').get(openPollId)
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenPoll: bindActionCreators(actions.getOpenPoll, dispatch)
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(LivePollContainer);

