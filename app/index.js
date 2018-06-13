import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from './redux/store';
import Geolocator from './components/map/Geolocator';
import AdsPurchasedCheck from './components/ads/AdsPurchasedChecker';


const geolocator = new Geolocator(store);
const adsPurchsedCheck = new AdsPurchasedCheck(store);

const AppProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);


class Main extends Component {
  render() {
    return (
      AppProvider
    );
  }
}

export default Main;

