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
      <View>
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
      <View>
        <View style={styles.container}>
          <ListView style={styles.listView}
            dataSource={dataSource}
            renderRow={this._renderRow} />
        </View>
        <View style={styles.container}>
          <TouchableHighlight onPress={this._goToLivePoll.bind(this)} style={styles.pastPolls}>
              <Text>View Live</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  listView: {
    borderTopWidth: 1
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 15
  },
  pastPolls: {
    flex: 1,
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