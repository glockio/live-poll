import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressViewIOS
    } = React;


class Answer extends React.Component {

    render() {
        return (
            <View>
                <TouchableHighlight
                    style={styles.answer}
                    activeOpacity={1}
                    animationVelocity={0}
                    underlayColor="#187AAD"
                    onPress={() => console.log('Q2')}>
                    <Text style={styles.label}>
                        Q2
                    </Text>
                </TouchableHighlight>
                <View style={styles.result}>
                    <ProgressViewIOS style={styles.bar} progressTintColor="#8DC63F" progress={0.5} trackTintColor="#ffffff"/>
                    <Text style={styles.percentage}>
                        20%
                    </Text>
                </View>
            </View>

        );
    }
}

Answer.defaultProps = {
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

module.exports = Answer;