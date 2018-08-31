import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { StackActions, NavigationActions } from "react-navigation";
import InAppBilling from 'react-native-billing';
import { connect } from 'react-redux';
import Button from '../common/Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  textContainer: {
    padding: 15,
    marginTop: 35,
    marginBottom: 30
  },
  text: {
    color: '#ef3a39',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Source Sans Pro 200',
    alignSelf: 'center'
  },
});

class AdInterstitial extends Component {
  onClose = () => {
  	console.info('this.props', this.props);
	  this.props.navigation.navigate('drawerMenu');
  };
  keepAds = () => {
	  this.props.navigation.navigate('drawerMenu');
	};
  pay = async () => {
    const productId = 'com.parkbark.adsremoved';
    await InAppBilling.close();
    try {
      await InAppBilling.open();
      if (!await InAppBilling.isPurchased(productId)) {
        const details = await InAppBilling.purchase(productId);
        this.props.dispatch({ type: 'SET_ADS_REMOVE', state: true });
        if (__DEV__) {
          console.log('You purchased: ', details);
        }
      }
      const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId);
      if (__DEV__) {
        console.log('Transaction Status', transactionStatus);
      }
      const productDetails = await InAppBilling.getProductDetails(productId);
      if (__DEV__) {
        console.log(productDetails);
      }
    } catch (err) {
      if (__DEV__) {
        console.log(err);
      }
    } finally {
      // await InAppBilling.consumePurchase(productId); //don't do this in production, just for testing -- makes the purchase expire so you can try again
      await InAppBilling.close();
      // await Actions.popTo('map');
	    const resetAction = StackActions.reset({
		    index: 0,
		    actions: [
			    NavigationActions.navigate({ routeName: 'drawerMenu' })
		    ]
	    });
	    this.props.navigation.dispatch(resetAction);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.onClose}
          style={{
            position: 'absolute', top: 30, right: 15, zIndex: 1
          }}
          hitSlop={{
            top: 10, left: 10, bottom: 10, right: 10
          }}
        >
          <Image style={{ width: 20, height: 20, opacity: 0.67 }} source={require('../../img/button_close.png')} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Ads help us keep this app free
          </Text>
        </View>
        <AdMobBanner
          adSize="mediumRectangle"
          //   adUnitID="ca-app-pub-3940256099942544/6300978111" // test
          adUnitID="ca-app-pub-7642882868968646/4239983211" // Park Bark interstitial
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
        <Button
          bgimage={require('../../img/transparent.png')}
          text="Keep ads "
          textColor="#8b8b8b"
          alignSelf="center"
          fontSize={15}
          font="Source Sans Pro 200"
          onPress={this.keepAds}
        />
        <Button
          bgimage={require('../../img/red-gradient.png')}
          text="Remove ads "
          alignSelf="stretch"
          textColor="#fff"
          font="Source Sans Pro 700"
          fontSize={15}
          onPress={this.pay}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AdInterstitial);
