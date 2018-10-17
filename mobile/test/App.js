import React, { Component } from 'react';
import { StyleSheet, View, YellowBox} from 'react-native';

import {RootNavigator, SignOutStack}  from './src/navigation-config/HomeStack';
import Splash from './src/components/splash-ui/Splash';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { Provider } from  "react-redux";
import store from './src/redux/store';

import TabBar from './src/components/custom-ui/tabbar-interaction/TabBar';

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = { splashScreen: true};

    setTimeout(()=>{
      this.setState({ splashScreen:false});
    },3000);
  }

  render() {
    const { splashScreen } = this.state;
    let mainScreen = splashScreen ? <Splash /> : <RootNavigator />;

    return (
      <Provider store = { store } >
        <RootNavigator/>
      </Provider>
    );
  //   return (<TabBar>
  //     <TabBar.Item
  //     // icon={require('./tab1.png')}
  //     // selectedIcon={require('./tab1_sel.png')}
  //      title="Tab1"
  //      screenBackgroundColor={{ backgroundColor: '#008080' }}
  //  >
  //     <View>

  //     </View>
  //     </TabBar.Item>
  //     <TabBar.Item
  //     // icon={require('./tab2.png')}
  //      // selectedIcon={require('./tab2_sel.png')}
  //      title="Tab2"
  //      screenBackgroundColor={{ backgroundColor: '#F08080' }}
  //  >
  //     <View>

  //     </View>
  //     </TabBar.Item>
  //     <TabBar.Item
  //      //icon={require('./tab3.png')}
  //      //selectedIcon={require('./tab3_sel.png')}
  //      title="Tab3"
  //      screenBackgroundColor={{ backgroundColor: '#485d72' }}
  //  >
  //      <View>

  //      </View>
  //      </TabBar.Item>
  //      </TabBar>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});