import React from 'react-native';
import Immutable from 'immutable';
var _ = require('lodash');
var Accordion = require('react-native-collapsible/Accordion');
var Animatable = require('react-native-animatable');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
        <Text>{question.get('questionText')}</Text>
      </Animatable.View>
    );
  }

  _renderResults(question, i, isActive) {
    return (
      <Animatable.View
        style={[styles.content, isActive && styles.isActive]}
        duration={200}
        transition="backgroundColor">
        <Text>Results</Text>
      </Animatable.View>
    );
  }

  _changeQuestion(index) {
    let questions = this.props.questions.toArray();
    console.log(questions[index].toJS());
  }

  render() {
    console.log(windowSize);
    let sections = this.props.questions.toArray();
    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Accordion
              sections={sections} 
              renderHeader={this._renderQuestion}
              renderContent={this._renderResults}
              underlayColor='#333333'
              easing="easeOutCubic"
              onChange={this._changeQuestion}/>
          </ScrollView>
          <TouchableHighlight onPress={this._goToLivePoll.bind(this)} style={styles.pastPolls}>
            <Text style={styles.flip}>Current Poll</Text>
          </TouchableHighlight>
        </View>
    );
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
    padding: 15,
    backgroundColor: 'rgba(245,252,255,1)'
  },
  pastPolls: {
      margin: 0,
      justifyContent: 'flex-end'
  },
  flip: {
      padding: 5,
      fontSize: 20,
      backgroundColor: '#242424',
      borderColor: 'rgba(0,0,0,0.2)',
      color: '#ffffff',
      textAlign: 'center',
  }
});

QuestionsList.defaultProps = {
  questions: Immutable.Map({}),
};

module.exports = QuestionsList;