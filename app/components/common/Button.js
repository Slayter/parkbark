import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Button extends Component {

  render() {
    const styles = {
      button: {
        backgroundColor: this.props.bgcolor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: this.props.alignSelf,
        borderRadius: 15,
        padding: 5,
        margin: 10,
        flexDirection: 'column',
				// width: width / 3 * 2,
				// height: 35,
      },
      wrapper: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
				// width: '100%',
				// height: '100%'
      },
      buttonText: {
        alignSelf: 'center',
        fontSize: this.props.fontSize,
        color: this.props.textColor,
        fontFamily: this.props.font,
        marginTop: 0
    },
      buttonIcon: {
        alignSelf: 'center',
        minHeight: 12,
        minWidth: 15,
    },
			container: {
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				justifyContent: 'center',
				alignItems: 'center',
        flexDirection: 'row'
      }
    }

    return (
      <TouchableOpacity
        style={styles.button}
        underlayColor={'transparent'}
        onPress={this.props.onPress}
    >
				<Image source={this.props.bgimage} style={styles.wrapper} />
				<View style={styles.container}>
					<Image style={styles.buttonIcon} source={this.props.icon} />
					<Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}
