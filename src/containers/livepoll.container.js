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
    this.props.getPolls(fireRef);
    this.props.getLivePollId(fireRef);

    //this.props.getAnswersVotes(fireRef, "-K5CpNK_ZtZQj3P_t4Hu");

    //fireRef.child('polls').on('child_changed', (snapShot) => {
    //  const value = snapShot.val();
    //  this.props.setCount(value);
    //});
  }

  render(){
    console.log("OPEN POLL", this.props.openPoll.toJS());
    return <PollComponent navigator={this.props.navigator} />;
    //return Platform.OS === 'ios' ? <IOSPoll openPoll={this.props.openPoll}/> : <AndroidPoll openPoll={this.props.openPoll}/>;
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: 'yellow',
    },

    header: {
        height: 120,
        backgroundColor: 'red',
    },

    body: {
        backgroundColor: 'green',
        flex: 1
    },

    footer: {
        height: 120,

    }

});

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
    getPolls: bindActionCreators(actions.getPolls, dispatch),
    getLivePollId: bindActionCreators(actions.getLivePollId, dispatch),
    //getAnswersVotes: bindActionCreators(actions.getAnswersVotes, dispatch),
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(LivePollContainer);

