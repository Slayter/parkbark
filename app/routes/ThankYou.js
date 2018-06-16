import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
      return Actions.popTo('map');
    }
    Actions.popTo('parkdetail');
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
