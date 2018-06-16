import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    padding: 5,
  }
};

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

export default CardSection;
