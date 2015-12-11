import React from 'react-native';
import Immutable from 'immutable';
var _ = require('lodash');
var Animatable = require('react-native-animatable');
var Dimensions = require('Dimensions');
var QuestionListResult = require('./question-list-result');

var windowSize = Dimensions.get('window');
var {Platform} = React;

const {
 StyleSheet, Navigator, View, ScrollView, Text, TextInput, TouchableHighlight
} = React;

if(!StyleSheet.flatten) {
  StyleSheet.flatten = require('flattenStyle');
}
class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this._changeQuestion = this._changeQuestion.bind(this);
    if (props.questions.size) {
      this._questions = _.map(props.questions.toJS(), (question, key) => {
        question.pollId = key;
        return question;
      });
    } else {
      this._questions = [];
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.questions, this.props.questions)) {
      this._questions = _.map(nextProps.questions.toJS(), (question, key) => {
        question.pollId = key;
        return question;
      });
    }
  }
  _goToLivePoll() {
    this.props.navigator.pop();
  }

  _renderQuestion(question, i, isActive) {
    return (
      <Animatable.View
        style={[styles.header, isActive && styles.isActive]}
        duration={200}
        transition="backgroundColor">
        <Text>{question.questionText}</Text>
      </Animatable.View>
    );
  }

  _renderResults(question, i, isActive) {
    var results;
    if (isActive) {
      console.log(question);
      results = _.map(question.answers, (answer, key) => <QuestionListResult totalVotes={question.totalVotes || 0} answer={answer} key={key} />);
      
    console.log(results);
    } else {
      results = [<View></View>];
    }
    return (
      <Animatable.View
        style={[styles.content, isActive && styles.isActive]}
        duration={200}
        transition="backgroundColor">
          {results}
      </Animatable.View>
    );
  }

  _changeQuestion(index) {
    if(this._questions.length && this._questions[index]) {
      this.props.onPollClick(this._questions[index].pollId);
    }
  }

  render() {
    if (Platform.OS == 'ios') {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Accordion
              sections={this._questions}
              renderHeader={this._renderQuestion}
              renderContent={this._renderResults}
              underlayColor='#333333'
              easing="easeOutCubic"
              onChange={this._changeQuestion} />
          </ScrollView>
          <TouchableHighlight onPress={this._goToLivePoll.bind(this)} style={styles.pastPolls}>
            <Text style={styles.flip}>Current Poll</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Accordion
              sections={this._questions}
              renderHeader={this._renderQuestion}
              renderContent={this._renderResults}
              underlayColor='#333333'
              easing="easeOutCubic"
              onChange={this._changeQuestion} />
          </ScrollView>
          <TouchableHighlight onPress={this._goToLivePoll.bind(this)} style={styles.pastPolls}>
            <Text style={styles.flipAndroid}>Current Poll</Text>
          </TouchableHighlight>
        </View>
      );
    }


  }
}

var styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection:'column',
    height: windowSize.height,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica Neue'
  },
  isActive: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  accordion: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  header: {
    padding: 15,
    borderTopWidth: 1,
    backgroundColor: 'rgba(245,252,255,1)'
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(245,252,255,1)'
  },
  pastPolls: {
      margin: 0
  },
  flip: {
      padding: 5,
      fontSize: 20,
      backgroundColor: '#242424',
      borderColor: 'rgba(0,0,0,0.2)',
      color: '#ffffff',
      textAlign: 'center',
  },
  flipAndroid: {
    height: 60,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#242424',
    borderColor: 'rgba(0,0,0,0.2)',
    color: '#ffffff',
    textAlign: 'center',
  },
  result: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    flexWrap: 'nowrap'
  }
});

QuestionsList.defaultProps = {
  questions: Immutable.Map({}),
};

module.exports = QuestionsList;
