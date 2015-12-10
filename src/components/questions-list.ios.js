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
  render() {
    let dataSource = this._dataSource.cloneWithRows(this.props.questions.toArray());

    return (
      <View style={styles.container}>
        <ListView style={styles.listView}
          dataSource={dataSource}
          renderRow={this._renderRow} />
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