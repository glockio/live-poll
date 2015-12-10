import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 Navigator, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, ProgressViewIOS
} = React;

class AppRouter extends React.Component {

  renderScene(route, nav) {
    switch (route.name) {
      case 'currentQ':
        return (
          <View style={styles.container}>
            <Text style={styles.question}>
              Which quarter do you think will be Hootsuite's biggest in 2016?
            </Text>
            <View style={styles.buttons}>
              <TouchableHighlight
                  style={styles.answer}
                  activeOpacity={1}
                  animationVelocity={0}
                  underlayColor="#187AAD"
                  onPress={() => console.log('Q1')}>
                <Text style={styles.label}>
                  Q1
                </Text>
              </TouchableHighlight>
              <View>
                <ProgressViewIOS style={styles.bar} progressTintColor="#8DC63F" progress={0.5} trackTintColor="#ffffff"/>
              </View>
              <TouchableHighlight
                  style={styles.answer}
                  activeOpacity={1}
                  animationVelocity={0}
                  underlayColor="#187AAD"
                  onPress={() => console.log('Q2')}>
                <Text style={styles.label}>
                  Q2
                </Text>
              </TouchableHighlight>
              <View>
                <ProgressViewIOS style={styles.bar} progressTintColor="#D04949" progress={0.4} trackTintColor="#ffffff"/>
              </View>
              <TouchableHighlight
                  style={styles.answer}
                  activeOpacity={1}
                  animationVelocity={0}
                  underlayColor="#187AAD"
                  onPress={() => console.log('Q3')}>
                <Text style={styles.label}>
                  Q3
                </Text>
              </TouchableHighlight>
              <View>
                <ProgressViewIOS style={styles.bar} progressTintColor="#D04949" progress={0.3} trackTintColor="#ffffff"/>
              </View>
              <TouchableHighlight
                  style={styles.answer}
                  activeOpacity={1}
                  animationVelocity={0}
                  underlayColor="#187AAD"
                  onPress={() => console.log('Q4')}>
                <Text style={styles.label}>
                  Q4
                </Text>
              </TouchableHighlight>
              <View>
                <ProgressViewIOS style={styles.bar} progressTintColor="#D04949" progress={0.2} trackTintColor="#ffffff"/>
              </View>
            </View>
          </View>
        );
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Helvetica Neue'
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 50
  },
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
  question: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  },
  bar: {
    margin: 10,
  }
});

export default AppRouter;
