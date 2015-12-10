import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressViewIOS
} = React;

var Poll = require('./components/poll.component');


class AppRouter extends React.Component {

  renderScene(route, nav) {
    switch (route.name) {
      case 'currentQ':
        return <Poll/>;
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
