import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import * as actions from '../actions/loading.actions';

const {Text, View, StyleSheet, Component, TouchableHighlight} = React;

class LivePollContainer extends Component {

  componentDidMount() {

    const {fireRef} = this.props;
    console.log(fireRef);
    this.props.getPolls(fireRef);

    //this.props.getAnswersVotes(fireRef, "-K5CpNK_ZtZQj3P_t4Hu");

    //fireRef.child('polls').on('child_changed', (snapShot) => {
    //  const value = snapShot.val();
    //  this.props.setCount(value);
    //});
  }


  render(){
    const {fireRef} = this.props;
    return(
      <View style={ styles.container}>
        <Text> {this.props.loading.isLoading ? this.props.loading.message : "NOT LOADING"}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: 'yellow',
    },

    header: {
        height: 120,
        backgroundColor: 'red',
    },

    body: {
        backgroundColor: 'green',
        flex: 1
    },

    footer: {
        height: 120,

    }

});

const mapReduxStoreToProps = (reduxStore) => {
    const countRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');
    return {
        fireRef: countRef,
        loading: reduxStore.get('loading'),
        error: reduxStore.get('error'),
        openPollId: reduxStore.get('openPollId'),
        polls: reduxStore.get('polls'),
        votes: reduxStore.get('votes')
    };
};

const mapDispatchToProps = (dispatch) => {
  const fireRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');
  return {
    getPolls: bindActionCreators(actions.getPolls, dispatch),
    getLivePollId: bindActionCreators(actions.getLivePollId, dispatch),
    //getAnswersVotes: bindActionCreators(actions.getAnswersVotes, dispatch),
  }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(LivePollContainer);

