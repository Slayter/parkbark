import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/common/Button.js';
import { fetchAmenitiesAction } from '../src/filter_core';
import networkAlert from '../components/common/NetworkAlert';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: 500,
  },
  imageContainer: {
    //  marginTop: 20,
  },
  textContainer: {
    marginBottom: 10
  },
  title: {
    color: '#F58120',
    fontSize: 48,
    fontFamily: 'Source Sans Pro 200',
    lineHeight: 56,
    marginBottom: 25,
  },
  text: {
    fontFamily: 'Source Sans Pro 200',
    color: '#5e5e5e',
    lineHeight: 23,
    fontSize: 16,
    marginBottom: 10
  }
});

class Landing extends Component {
  componentWillMount() {
  // TODO: configure notifications for IOS
  // if (Platform.OS === 'ios') {
  //   PushNotification.checkPermissions((response) => {
  //     for (var item in response) {
  //       if (response[item]) {
  //         this.props.dispatch({type: 'SET_NOTIFICATIONS', state: true})
  //         break
  //       }
  //     }
  //   })
  // }
  }

  componentDidMount() {
    fetchAmenitiesAction().done((amenities) => {
      if (!amenities) {
        return networkAlert.checkConnection();
      }
      this.props.dispatch({ type: 'SET_AMENITIES', state: amenities });
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }

  onNextPress = () => {
    if (this.props.notificationState || Platform.OS === 'android') {
      this.props.navigation.navigate('drawerMenu');
    } else {
      // TODO:Handle notification check for IOS
      // this.props.navigator.push({name: 'features'});
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={require('../img/welcomePup.png')} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} type="text">Find dog parks near you.</Text>
            <Text style={styles.text}>
              {`Looking for just the perfect place to let your dog run free? Fenced? Water available? We've got all of the details you're looking for.`}
            </Text>
          </View>
          <Button
            bgimage={require('../img/orange-gradient-long.png')}
            icon={require('../img/forward-arrow.png')}
            alignSelf="center"
            onPress={this.onNextPress}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  notificationState: state.getIn(['core', 'notifications'])
});


export default connect(mapStateToProps)(Landing);
