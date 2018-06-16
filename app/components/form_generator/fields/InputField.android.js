

import React from 'react';
import { StyleSheet } from 'react-native';
import { InputComponent } from '../lib/InputComponent';

export class InputField extends React.Component {
  setValue(value) {
    this.refs.fieldComponent.setValue(value);
  }
  handleValidation = (isValid, validationErrors) => {
    this.valid = isValid;
    this.validationErrors = validationErrors;
  };

  focus() {
    this.refs.fieldComponent.focus();
  }
  render() {
    return (
      <InputComponent
        {...this.props}
        ref="fieldComponent"
        onValidation={this.handleValidation}
        // onChange={this.handleChange.bind(this)}
        // ref={this.props.fieldRef}
      />
    );
  }
}
