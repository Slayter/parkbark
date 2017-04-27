import {Map} from 'immutable';
import {PermissionsAndroid, Alert} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";



class Geolocator {
  constructor(store) {

    // set default position
    store.dispatch({
      type: 'SET_LOCATION',
      state: Map({
        coords: {
          latitude: 45.523031,
          longitude: -122.676772,
          latitudeDelta: .1,
          longitudeDelta: .1
        },
        parks: []
      })
    });

    ////// check for permissions on android, works with SDK API versions 23 and above
    function requestLocationPermission() {
      LocationServicesDialogBox.enableLocationPermission();
      LocationServicesDialogBox.checkLocationService({
        message: "<h2>Park Bark Needs Your Location</h2>This app would like to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/>",
        ok: "OK",
        cancel: "No Thank You"
      })
        .then(function(success) {
          if (__DEV__) {
            console.log('location ', success); // success => "enabled"
          }
          startWatch();
        }).catch((error) => {
          if (__DEV__) {
            console.log(error.message); // error.message => "disabled"
          }
        });
    }
    requestLocationPermission();
    let intervalId = -1;
    function startWatch() {
      intervalId = setInterval(function() {
        LocationServicesDialogBox.checkLocationPermission()
          .then((status) => {
            if (intervalId !== -1) {
              intervalId = -1;
              if (status === 'enabled') {
                clearInterval(intervalId);
                startWatchLocation();
              }
            }
          });
      }, 1000);
    }

    function startWatchLocation() {
      //////get current position and set users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (__DEV__) {
            console.log('get current position', position);
          }
          store.dispatch({
            type: 'SET_LOCATION',
            state: Map({
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
              },
              parks: []
            })
          });
          const userLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          store.dispatch({type: 'SET_POSITION', state: userLatLng})
        },
        (error) => {
          if (__DEV__) {
            console.log(error);
          }
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
      );
      ////// on success add watch to users location to update state on location change.
      navigator.geolocation.watchPosition(
        (position) => {
          console.log('watchPosition position', position);
          store.dispatch({
            type: 'SET_LOCATION',
            state: Map({
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
              },
              parks: []
            })
          });
        },
        (error) => {
          if (__DEV__) {
            console.log(error);
          }
        }
      )
    };
  }
}

export default Geolocator;
