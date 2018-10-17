import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import TabBar from './TabBar'
class Home extends Component {

  render() {
    return (
        <TabBar>
          <TabBar.Item
             
              title="Tab1"
              screenBackgroundColor={{ backgroundColor: '#008080' }}
          >
            <View>
                {/*Page Content*/}
            </View>
          </TabBar.Item>
          <TabBar.Item
            
              title="Tab2"
              screenBackgroundColor={{ backgroundColor: '#F08080' }}
          >
              <View>
                  {/*Page Content*/}
              </View>
          </TabBar.Item>
          <TabBar.Item
              
              title="Tab3"
              screenBackgroundColor={{ backgroundColor: '#485d72' }}
          >
            <View>
                {/*Page Content*/}
            </View>
          </TabBar.Item>
        </TabBar>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#64b5f6',
    flex:1,
  },
});
export default Home;