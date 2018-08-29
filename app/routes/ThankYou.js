import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ThankYou extends Component {
  componentDidMount() {
    setTimeout(this.changeScene, 3000);
  }

  changeScene = () => {
    console.info('this.props', this.props);
    if (this.props.suggestPark) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'drawerMenu' })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } else {
			this.props.navigation.navigate('parkdetail');
		}
  };
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image source={require('../img/survey_pup.png')} />
      </View>
    );
  }
}
export default ThankYou;
