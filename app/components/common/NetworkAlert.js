import React from 'react';
import { NetInfo, Alert, BackHandler } from 'react-native';


class NetworkAlert {
  constructor() {
    this.isConnected = null;
    this.timeOut = null;
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
  }
	
  _handleConnectionInfoChange = (connectionInfo) => {
	  this.isConnected = connectionInfo.type !== 'none';
	  if (!this.isConnected) {
		  if (!this.timeOut) {
			  this.timeOut = setTimeout(() => {
				  clearTimeout(this.timeOut);
				  this.timeOut = 0;
				  Alert.alert(
					  'Network Offline',
					  'Sorry, but WIFI is necessary to use our app',
					  [
						  { text: 'OK', onPress: () => BackHandler.exitApp() },
					  ],
					  {
						  cancelable: false
					  }
				  );
			  }, 1000 * 60 * 3);
		  }
	  } else {
		  clearTimeout(this.timeOut);
		  this.timeOut = 0;
	  }
	};

  checkConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected === false) {
      	clearTimeout(this.timeOut);
      	this.timeOut = 0;
      	Alert.alert(
          'Network Offline',
          'Sorry, but WIFI is necessary to use our app',
          [
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          {
            cancelable: false
          }
        );
      }
    });
  }
}

const networkAlert = new NetworkAlert();
export default networkAlert;
