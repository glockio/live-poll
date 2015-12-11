

import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import QuestionsList from '../components/questions-list';
import Firebase from 'firebase';
import * as Actions from '../actions/loading.actions';
const {Navigator, Text, View, Component, BackAndroid} = React;


class QuestionsContainer extends React.Component {

  onClickSinglePoll(pollId) {
    const {rootFireRef} = this.props;
    this.props.updateSinglePollWithVotes(pollId, rootFireRef);
  }

  componentDidMount() {

    const {rootFireRef} = this.props;
    this.props.fetchPolls(rootFireRef)

    rootFireRef.child('polls').on('value', (snapShot) => {
      // for right now just reset collection but can refactor later to listen to correct events
      this.props.setPolls(snapShot.val());
    });

    // listen for Android back press events
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  render(){
    const {questions, navigator} = this.props;
    return(
      <View>
        <QuestionsList navigator={navigator} questions={questions} onPollClick={this.onClickSinglePoll.bind(this)}/>
      </View>
    );
  }
}

const mapReduxStoreToProps = (reduxStore) => {
    const rootRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');
    return {
      rootFireRef: rootRef,
      isLoading: reduxStore.getIn(['loading', 'isLoading']),
      questions: reduxStore.get('polls'),
      loadingMessage: reduxStore.getIn(['loading', 'message'])
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPolls: bindActionCreators(Actions.setPolls, dispatch),
    fetchPolls: bindActionCreators(Actions.getPolls, dispatch),
    updateSinglePollWithVotes: bindActionCreators(Actions.updateSinglePollWithVotes, dispatch)
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(QuestionsContainer);
