import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
// import { Form, InputField } from 'react-native-form-generator';
import { Form, InputField } from './../../components/form_generator';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  question: {
    color: '#f58120',
    fontFamily: 'Source Sans Pro 200',
    fontSize: 48,
    lineHeight: 51,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 140,
    fontFamily: 'Source Sans Pro 900',
    color: '#f58120',
    lineHeight: 51,
  }
});

class Survey_NumDogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        num_dogs: 5
      },
    };
  }

  onClosePress = () => {
    const updateValue = {};
    updateValue.title = 'num_dogs';
    updateValue.value = this.state.formData.num_dogs;
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    this.sendFormData().done(() => {
      Actions.thanks({ suggestPark: false });
    });
  };

  handleFormChange = (formData) => {
    this.setState({ formData });
    this.props.onFormChange && this.props.onFormChange(formData);
  };

  saveFormData = () => {
    const updateValue = {};
    updateValue.title = 'num_dogs';
    updateValue.value = this.state.formData.num_dogs;
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    Actions.surveyFencedArea();
  };

  sendFormData() {
    const formData = this.props.parkForm;
    return sendSurveyResponses(formData);
  }

  addNumber = () => {
    const newFormData = this.state.formData;
    newFormData.num_dogs = parseInt(this.state.formData.num_dogs, 10) + 1;
    this.setState({ formData: newFormData });
    this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  };

  subtractNumber = () => {
    const newFormData = this.state.formData;
    newFormData.num_dogs = parseInt(this.state.formData.num_dogs, 10) - 1;
    this.setState({ formData: newFormData });
    this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  };

  render() {
    const value = this.state.formData.num_dogs.toString();
    return (
      <View ref="surveyForm" style={styles.container}>
        <TouchableOpacity
          onPress={this.onClosePress}
          style={{
            position: 'absolute', top: 30, right: 15, zIndex: 1
          }}
          hitSlop={{
            top: 10, left: 10, bottom: 10, right: 10
          }}
        >
          <Image style={{ width: 20, height: 20, opacity: 0.67 }} source={require('../../img/button_close.png')} />
        </TouchableOpacity>
        <Text style={styles.question}>How many dogs do you see at the park?</Text>
        <Form
          ref="surveyFormNumDogs"
          onChange={this.handleFormChange}
          style={styles.wrapper}
        >
          <Button
            bgimage={require('../../img/Minus.png')}
            onPress={this.subtractNumber}
          />
          <InputField
            ref="num_dogs"
            value={value}
            keyboardType="numeric"
            underlineColorAndroid="#fff"
            style={styles.input}
          />
          <Button
            bgimage={require('../../img/Plus.png')}
            onPress={this.addNumber}
          />
        </Form>
        <Button
          bgimage={require('../../img/orange-gradient-long.png')}
          text=" OK "
          fontSize={15}
          font="Source Sans Pro 700"
          textColor="#fff"
          onPress={this.saveFormData}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  parkForm: state.getIn(['survey', 'park_form']).toJS()
});


export default connect(mapStateToProps)(Survey_NumDogs);
