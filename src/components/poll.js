import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressBarAndroid
    } = React;

var AndroidAnswer = require('./answer.android');
var IOSAnswer = require('./answer.android');

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
    answer: {
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
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    result: {
        flex: 1,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'flex-start',
        flexWrap: 'nowrap'
    },
    bar: {
        alignSelf: 'stretch'
    },
    percentage: {
        alignSelf: 'flex-end'
    }
});

module.exports = Poll;