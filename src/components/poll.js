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

    renderAnswer(answerData) {
        return Platform.OS === 'ios' ? <IOSAnswer/> : <AndroidAnswer answer={answerData}/>;
    }


    render(){
        var answers = this.props.answers;
        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                    Which quarter do you think will be Hootsuite's biggest in 2016?
                </Text>
                <View style={styles.buttons}>
                    {answers.map(this.renderAnswer)}
                </View>
                <TouchableHighlight onPress={this._goToPastPolls.bind(this)} style={styles.pastPolls}>
                    <Text>View Past Polls</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

Poll.defaultProps = {
    onMePress: () => {
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
        padding: 20,
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
        borderRadius: 10,
        padding: 5,
        margin: 10,
        backgroundColor: '#00AEEF',
        shadowColor: '#1a1a1a',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

module.exports = Poll;