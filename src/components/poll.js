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

    renderAnswer(answerData, onPress) {
        return Platform.OS === 'ios'
            ? <IOSAnswer answer={answerData} onPress={onPress}/>
            : <AndroidAnswer answer={answerData} onPress={onPress}/>;
    }

    render(){
        var answers = this.props.answers;
        var onPress = this.props.onPress;
        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                    Which quarter do you think will be Hootsuite's biggest in 2016?
                </Text>
                <View style={styles.buttons}>
                    {answers.map((answerData) => this.renderAnswer(answerData, onPress))}
                </View>
                <TouchableHighlight onPress={this._goToPastPolls.bind(this)} style={styles.pastPolls}>
                    <Text style={styles.flip}>Past Polls</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

Poll.defaultProps = {
    onPress: () => {
        console.log('Submit button pressed');
    },
    answers: [
        {name: "test1", action:"test1"},
        {name: "test2", action:"test2"},
        {name: "test3", action:"test3"},
        {name: "test4", action:"test4"}
    ]
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