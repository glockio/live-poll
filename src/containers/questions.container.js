

import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import QuestionsList from '../components/questions-list';
import Firebase from 'firebase';
import * as Actions from '../actions/loading.actions';
const {Navigator, Text, View, Component} = React;


class QuestionsContainer extends React.Component {

  componentDidMount() {

    const {rootFireRef} = this.props;
    this.props.fetchPolls(rootFireRef)

    rootFireRef.child('polls').on('value', (snapShot) => {
      // for right now just reset collection but can refactor later to listen to correct events
      this.props.setPolls(snapShot.val());
    });
  }

  render(){
    const {questions, navigator} = this.props;
    return(
      <View>
        <QuestionsList  navigator={navigator} questions={questions}/>
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
    fetchPolls: bindActionCreators(Actions.getPolls, dispatch)
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(QuestionsContainer);
