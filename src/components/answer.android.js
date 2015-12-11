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
      progress: 0.1
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

  render() {
    var answer = this.props.answer;
    console.log("answer: " + answer);
    var onPress = this.props.onPress;
    return (
      <View>
        <TouchableHighlight
          style={styles.answer}
          activeOpacity={1}
          animationVelocity={0}
          underlayColor="#187AAD"
          onPress={onPress}>
          <Text style={styles.label}>
            {answer.text}
          </Text>
        </TouchableHighlight>
        <View style={styles.result}>
          <ProgressBar
            backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
            style={{marginTop: 10, width: 200}}
            progress={this.state.progress}/>
          <Text style={styles.percentage}>
                    {this.state.progress * 100}
          </Text>
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