import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
var IOSQuestionsList = require('./components/questions-list.ios');


const {
    Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressViewIOS
    } = React;

var PollComponent = require('./components/poll');
var LivePollContainer = require('./containers/livepoll.container');

class AppRouter extends React.Component {

  renderScene(route, nav) {
    switch (route.name) {
      case 'currentQ':
        return <PollComponent />;
        //return Platform.OS === 'ios' ? <IOSPoll/> : <AndroidPoll/>;
      case 'questionList':
        return <IOSQuestionsList />;
      default:
        return <View><Text>Hello World</Text></View>;
    }
  }

  render(){
    return(
      <Navigator
       initialRoute={ { name: "currentQ"} }
       renderScene={this.renderScene.bind(this)}
       configureScene={ (route) => {
         if (route.sceneConfig) {
           return route.sceneConfig;
         }
         return Navigator.SceneConfigs.FloatFromRight;
       }}
      />
    );
  }
}

export default AppRouter;
