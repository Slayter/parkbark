import React, { Component } from 'react';
import PushWoosh from 'pushwoosh-react-native-plugin';
import Navigator from './navigation/Navigator';

class App extends Component {
  componentDidMount() {
    this.initPushWoosh();
  }
  initPushWoosh() {
    console.log('PushWoosh');
    PushWoosh.init({ pw_appid : 'B29B5-27215' , project_number : '382792723547' });
    PushWoosh.register((token) => {
      console.log('Registered for push notifications with token: ', token);
      PushWoosh.startLocationTracking()
    }, (error) => {
      console.log('Failed to register for push notifications: ' + error);
    });
  }
  render() {
    return (
      <Navigator />
    );
  }
}

export default App;
