import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
    Navigator, View, ScrollView, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressBarAndroid
    } = React;


var Answer = require('./answer');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {Platform} = React;

class Poll extends React.Component {
    _goToPastPolls() {
       this.props.navigator.push({name: "questionList"});
    }

    constructor(props) {
        super(props);
    }

    renderAnswer(answer, hasVoted=false) {
      const totalVotes = this.props.openPoll.get("totalVotes");

      return<Answer answer={answer} onPress={this.props.onPress} voted={hasVoted} totalVoteCount={totalVotes}/>
    }

    renderAnswer0 (answersJSON) {
      var items = [];
      for (answerKey in answersJSON) {
        answersJSON[answerKey]['answerKey'] = answerKey;

        items.push(this.renderAnswer(answersJSON[answerKey], this.hasUserVotedOnAnswer(answerKey)));
      }
      return items;
    }

    hasUserVotedOnAnswer (answerId) {
      return this.props.selectedAnswerId == answerId;
    }

    render(){
      const {openPoll, onPress} = this.props;
      const answers = openPoll.get("answers");
      //console.log(answers);
      console.log(answers.toJS());
      const questionText = openPoll.get("questionText");

      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.questionWrapper}>
              <Text style={styles.question}>
                {questionText}
              </Text>
              <View style={styles.buttons}>
                {this.renderAnswer0(answers.toJS())}
                <Text style={styles.totalvotes}>(Total # of votes: {this.props.openPoll.get("totalVotes")})</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableHighlight onPress={this._goToPastPolls.bind(this)} style={styles.pastPolls}>
            <Text style={styles.flip}>Past Polls</Text>
          </TouchableHighlight>
        </View>
      );
    }
}

Poll.defaultProps = {
  selectedAnswerId: null,
};

var styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    container: {
        flex: 1,
        height: windowSize.height,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
        paddingTop: 50,
        fontFamily: 'Helvetica Neue'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 50,
        marginRight: 50,
    },
    questionWWrapper: {
        flex: 1
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
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
    },
    totalvotes: {
        textAlign: 'right',
      marginRight: 15
    }
});

module.exports = Poll;
