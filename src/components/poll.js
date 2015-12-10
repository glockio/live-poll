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

    render() {
        var answer = Platform.OS === 'ios' ? <IOSAnswer/> : <AndroidAnswer/>;
        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                    Which quarter do you think will be Hootsuite's biggest in 2016?
                </Text>
                <View style={styles.buttons}>
                    {answer}
                    {answer}
                    {answer}
                    {answer}
                </View>
            </View>
        );
    }
}

Poll.defaultProps = {
    onMePress: () => {
        console.log('Submit button pressed');
    }
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
        margin: 10,
    },
});

module.exports = Poll;