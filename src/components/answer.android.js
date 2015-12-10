import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressBarAndroid
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
                    <ProgressBarAndroid styleAttr="Horizontal" progressTintColor="#D04949" progress={0.2} trackTintColor="#ffffff"/>
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
    label: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    result: {
        flex: 1,
        marginBottom: 10,
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