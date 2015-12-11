import React from 'react-native';
import Immutable from 'immutable';
var Accordion = require('react-native-accordion');

const {
 StyleSheet, Navigator, View, Text, TextInput, TouchableHighlight, ListView
} = React;

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => r1 !== r2,
    });
  }

  _renderRow(question) {
    var header = (
      <View style={styles.row}>
        <Text>{question.get('questionText')}</Text>
      </View>
    );

    var content = (
      <View style={styles.rowhidden}>
        <Text>This content is hidden in the accordion</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic" />
    );
  }

  _goToLivePoll() {
    this.props.navigator.pop();
  }

  render() {
    let dataSource = this._dataSource.cloneWithRows(this.props.questions.toArray());

    return (
      <View style={styles.container}>
          <ListView contentContainerStyle={styles.listView}
            dataSource={dataSource}
            renderRow={this._renderRow} />
          <TouchableHighlight onPress={this._goToLivePoll.bind(this)} style={styles.pastPolls}>
            <Text style={styles.flip}>Current Poll</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica Neue'
  },
  listView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
  },
  row: {
      padding: 15,
      borderTopWidth: 1
  },
  rowhidden: {
      padding: 15
  },
  pastPolls: {
      flex: 1,
      margin: 0,
      justifyContent: 'flex-end'
  },
  flip: {
      padding: 5,
      fontSize: 20,
      backgroundColor: '#242424',
      borderColor: 'rgba(0,0,0,0.2)',
      color: '#ffffff',
      textAlign: 'center',
  }
});

QuestionsList.defaultProps = {
  questions: Immutable.fromJS([
    {
      questionText: 'Question 1'
    },
    {
      questionText: 'Question 2'
    },
    {
      questionText: 'Question 3'
    },
    {
      questionText: 'Question 4'
    }
  ])
};
module.exports = QuestionsList;