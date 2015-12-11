import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressViewIOS
    } = React;


class Answer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voted: false,
        };
    }

    render() {
        console.log(this.props);

        var onPress = function() {
          this.setState((state) => (
            {voted: !state.voted}
          ));
          this.props.onPress(this.props.answer.answerKey);
        }.bind(this);

        //var progress = 0;
        var progress = (this.props.answer.voteCount / this.props.totalVoteCount);

        return (
            <View>
                <TouchableHighlight
                    style={[styles.answer, this.state.voted && styles.voted]}
                    activeOpacity={1}
                    animationVelocity={0}
                    underlayColor="#187AAD"
                    onPress={onPress}>
                    <Text style={styles.label}>
                        {this.props.answer.text}
                    </Text>
                </TouchableHighlight>
                <View style={styles.result}>
                    <ProgressViewIOS style={styles.bar} progressTintColor="#8DC63F" progress={progress} trackTintColor="#ffffff"/>
                    <Text style={styles.percentage}>
                      {(progress * 100).toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    }
}

Answer.defaultProps = {
    onPress: () => {
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
    voted: {
        backgroundColor: '#FF9100',
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