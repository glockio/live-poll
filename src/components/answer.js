import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
  Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet
  } = React;
var ProgressBar = require('react-native-progress-bar');


class Answer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: 0.0,
      voted: false
    }
  }

  setProgressStateFromProps(totalVotes, answer) {
    var progress = (totalVotes === undefined) ? 0.0 : (answer.voteCount / totalVotes);
    this.setState({
      progress: progress,
    })
  }

  componentDidMount() {
    this.setProgressStateFromProps(this.props.totalVoteCount, this.props.answer)
  }

  componentWillReceiveProps(nextProps) {
    this.setProgressStateFromProps(nextProps.totalVoteCount, nextProps.answer)
  }

  renderProgressValue() {
    if (this.state.progress == 0) {
      return null;
    } else {
      return (
        <Text style={styles.percentage}>
          {(this.state.progress * 100).toFixed(2)}%
        </Text>
      );
    }
  }
  render() {

    var onPress = function() {
      this.setState((state) => (
      {voted: !state.voted}
      ));
      this.props.onPress(this.props.answer.answerKey);
    }.bind(this);

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
          <ProgressBar
            backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
            style={{marginTop: 10, width: 220}}
            progress={this.state.progress}/>
          {this.renderProgressValue()}
        </View>
      </View>
    );
  }
}


Answer.defaultProps = {
  onPress: () => {
    console.log('Submit button pressed');
  },
  progress: 0.6,
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