import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
// import { Form, InputField } from 'react-native-form-generator';
import { Form } from './../../components/form_generator';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  question: {
    color: '#f58120',
    fontSize: 48,
    fontFamily: 'Source Sans Pro 200',
  },
  wrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Survey_Restrooms extends Component {
  constructor(props) {
    super(props);
    this.updateValue = null;
    this.state = {
      formData: {},
    };
  }

  clickYes = () => {
    const updateValue = {};
    updateValue.title = 'restrooms';
    // Drinking Water TID for api
    updateValue.value = 5;
    this.saveFormData(updateValue);
  };

  clickNo = () => {
    const updateValue = {};
    updateValue.title = 'restrooms';
    updateValue.value = 0;
    this.saveFormData(updateValue);
  };

  saveFormData(updateValue) {
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    this.updateValue = updateValue;
    if (this.props.suggestPark) {
      return Actions.surveyAgilityCourse({ suggestPark: true });
    }
    Actions.surveyAgilityCourse();
  }

  sendFormData() {
    const formData = this.props.parkForm;
    return sendSurveyResponses(formData);
  }
  onClosePress = () => {
    const updateValue = {};
    updateValue.title = 'restrooms';
    updateValue.value = this.state.formData.restrooms;
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    this.sendFormData().done(() => {
      if (this.props.suggestPark) {
        return Actions.thanks({ suggestPark: true });
      }
      Actions.thanks({ suggestPark: false });
    });
  };

  render() {
    const B = props => <Text style={{ fontFamily: 'Source Sans Pro 600' }}>{props.children}</Text>;
    return (
      <View
        ref="surveyForm"
        style={styles.container}
      >
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
        <Text style={styles.question}>Are there <B>restrooms</B>?</Text>
        <Form
          ref="surveyFormRestrooms"
          style={styles.wrapper}
        >
          <Button
            bgimage={require('../../img/orange-circle.png')}
            text="YES"
            textColor="#fff"
            fontSize={42}
            font="Source Sans Pro 900"
            onPress={this.clickYes}
            ref="restrooms"
          />
          <Button
            bgimage={require('../../img/orange-circle.png')}
            text="NO"
            textColor="#fff"
            fontSize={42}
            font="Source Sans Pro 900"
            onPress={this.clickNo}
            ref="restrooms_no"
          />
        </Form>
        <Button
          bgimage={require('../../img/transparent.png')}
          text={"I don't know"}
          textColor="#8b8b8b"
          fontSize={15}
          font="Source Sans Pro 200"
          onPress={this.clickNo}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  parkForm: state.getIn(['survey', 'park_form']).toJS()
});

export default connect(mapStateToProps)(Survey_Restrooms);
