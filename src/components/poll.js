import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressBarAndroid
    } = React;

var AndroidAnswer = require('./answer.android');
var IOSAnswer = require('./answer.ios');

var {Platform} = React;

class Poll extends React.Component {
    _goToPastPolls() {
       this.props.navigator.push({name: "questionList"});
    }

    constructor(props) {
        super(props);
    }

    renderAnswer(answer) {
      const totalVotes = this.props.openPoll.get("totalVotes");
      console.log("single answer", answer);
      //return null;
        return Platform.OS === 'ios'
            ? <IOSAnswer answer={answer} onPress={this.props.onPress} totalVoteCount={totalVotes}/>
            : <AndroidAnswer answer={answer} onPress={this.props.onPress} totalVoteCount={totalVotes}/>;
    }

    renderAnswer0 (answersJSON) {
      var items = [];
      for (answerKey in answersJSON) {
        items.push(this.renderAnswer(answersJSON[answerKey]));
      }
      return items;
    }

    render(){
      const {openPoll, onPress} = this.props;
      const answers = openPoll.get("answers");
      console.log(answers);
      console.log(answers.toJS());
      const questionText = openPoll.get("questionText");

        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                  {questionText}
                </Text>
                <View style={styles.buttons}>
                  {this.renderAnswer0(answers.toJS())}
                </View>
                <TouchableHighlight onPress={this._goToPastPolls.bind(this)} style={styles.pastPolls}>
                    <Text style={styles.flip}>Past Polls</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
//{)
Poll.defaultProps = {


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
    buttons: {
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 50
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    },
    pastPolls: {
        flex: 1,
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

module.exports = Poll;