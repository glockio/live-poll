import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import * as actions from '../actions/loading.actions.js.actions';

const {Text, View, StyleSheet, Component, TouchableHighlight} = React;

class LivePollContainer extends Component {

    componentDidMount() {

        const {fireRef} = this.props;
        //this.props.fetchCount(fireRef);
        //
        //fireRef.parent().on('child_changed', (snapShot) => {
        //  const value = snapShot.val();
        //  this.props.setCount(value);
        //});
    }

    render() {
        const {fireRef} = this.props;
        return (
            <View style={ styles.container}>
                <Text> {this.props.loading.isLoading ? this.props.loading.message : "NOT LOADING"}</Text>
                <Text> {this.props.error.isError ? this.props.error.message : "NO ERROR"}</Text>

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
    return {
        //setCount: bindActionCreators(actions.setCount, dispatch),
        //fetchCount: bindActionCreators(actions.fetchCount, dispatch),
        //startLoading: bindActionCreators(actions.setLoading, dispatch),
        //increaseCount: bindActionCreators(actions.increaseCount,dispatch)
    }
};

export default connect(mapReduxStoreToProps, mapDispatchToProps)(LivePollContainer);

