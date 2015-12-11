import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import * as actions from '../actions/loading.actions';
import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const {Navigator, Text, View, StyleSheet, Component, TouchableHighlight} = React;

var {Platform} = React;
var PollComponent = require('../components/poll');

class LivePollContainer extends Component {

  getOpenPoll() {
    this.props.getOpenPoll(this.props.fireRef);
  }

  componentDidMount() {
    const {fireRef} = this.props;
    this.props.getOpenPoll(fireRef);

    fireRef.child('openPollId').on('child_changed', this.getOpenPoll.bind(this));
    fireRef.child('votes').on('value', this.getOpenPoll.bind(this));
  }

  componentWillUnmount() {
    const {fireRef} = this.props;
    fireRef.child('openPollId').off('child_changed', this.getOpenPoll.bind(this));
    fireRef.child('votes').off('value', this.getOpenPoll.bind(this));
  }

  onVote(answerId) {
    var userId = this.props.userId;
    this.props.postVote(this.props.fireRef, userId, answerId);
  }

  render(){
    if (this.props.loading.get("isLoading")) {
      return (<View style={styles.container}><Text style={styles.loadingText}>Loading ...</Text></View>);
    } else {
      return (<PollComponent navigator={this.props.navigator} openPoll={this.props.openPoll} onPress={this.onVote.bind(this)}/>);
    }
  }
}

LivePollContainer.defaultProps = {
  openPoll: Map({
    answers: Map({
      text: ""
    })
  }),

  votes: Map({})
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    fontFamily: 'Helvetica Neue'
  },
  loadingText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  }
});

const mapReduxStoreToProps = (reduxStore) => {
    const countRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');
    const openPollId = reduxStore.get('openPollId');

    return {
        fireRef: countRef,
        loading: reduxStore.get('loading'),
        error: reduxStore.get('error'),
        openPoll: reduxStore.get('openPoll'),
        postVote: reduxStore.get('postVote'),
        userId: reduxStore.get('userId')
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOpenPoll: bindActionCreators(actions.getOpenPoll, dispatch),
    postVote: bindActionCreators(actions.postVote, dispatch)
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(LivePollContainer);

