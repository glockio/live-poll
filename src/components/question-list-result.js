import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const { View, Text, StyleSheet} = React;
var ProgressBar = require('react-native-progress-bar');


class QuestionListResult extends React.Component {
  render() {
    console.log(this.props);
    var progress = (this.props.totalVotes < 1) ? 0.0 : (this.props.answer.voteCount / this.props.totalVotes);
    return (
      <View style={styles.result}>
        <Text>{this.props.answer.text}</Text>
        <ProgressBar
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 220}}
          progress={progress}/>
        <Text style={styles.percentage}>
                  {(progress * 100).toFixed(2)}%
        </Text>
      </View>
    );
  }
}


QuestionListResult.defaultProps = {};

var styles = StyleSheet.create({
  result: {
    flex: 1
  }
});

module.exports = QuestionListResult;