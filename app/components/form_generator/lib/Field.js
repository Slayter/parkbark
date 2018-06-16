

import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { HelpText } from './HelpText';

const formStyles = StyleSheet.create({
  helpTextContainer: {
    marginTop: 9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  helpText: {
    color: '#7a7a7a'
  }
});


export class Field extends React.Component {
  render() {
    const fieldHelpText =
      this.props.helpTextComponent
      || ((this.props.helpText) ? <HelpText text={this.props.helpText} /> : null);

    if (this.props.onPress) {
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          <View>
            {this.props.children}
            {fieldHelpText}
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <View>
        {this.props.children}
        {fieldHelpText}
      </View>
    );
  }
}
Field.propTypes = {
  helpTextComponent: PropTypes.element,
  helpText: PropTypes.string
};
