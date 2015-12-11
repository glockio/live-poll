import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
    if (this.state.progress == 0 || isNaN(parseFloat(this.state.progress))) {
      return null;
    } else {
      return (
        <View style={styles.progressdetails}>
          <Text style={styles.usercount}>{this.props.answer.voteCount}</Text>
          <Text style={styles.percentage}>{(this.state.progress * 100).toFixed(2)}%</Text>
        </View>
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
          style={[styles.answer, this.props.voted && styles.voted]}
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
              backgroundStyle={{backgroundColor: '#ffffff', borderRadius: 0}}
              style={{marginTop: 10, marginLeft: 15, width: windowSize.width-130}}
              easingDuration={0}
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
    padding: 5,
    margin: 5,
    backgroundColor: '#00AEEF',
    shadowColor: '#1a1a1a',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    marginBottom: 20,
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'stretch',

  },
  bar: {
    marginTop: 10,
    width: 220
  },
  progressdetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    width: windowSize.width-130
  },
  usercount: {
  },
  percentage: {
  }
});

module.exports = Answer;