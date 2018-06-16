import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
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
    color: '#EF3A39',
    fontSize: 48,
    fontFamily: 'Source Sans Pro 200',
    marginBottom: 100
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  // input: {
  //     flex: 1,
  //     justifyContent: 'flex-end'
  // },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

class Survey_ParkName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: 'Unknown'
      }
    };
  }

  onClosePress = () => {
    const updateValue = {};
    updateValue.title = 'title';
    updateValue.value = this.state.formData.title;
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    Actions.pop();
  };

  handleFormChange = (formData) => {
    this.setState({ formData });
    this.props.onFormChange && this.props.onFormChange(formData);
  };

  saveFormData = () => {
    const updateValue = {};
    updateValue.title = 'title';
    updateValue.value = this.state.formData.title;
    this.props.dispatch({ type: 'UPDATE_SURVEY', state: updateValue });
    if (this.props.suggestPark) {
      return Actions.parkAddress({ suggestPark: true });
    }
    Actions.parkAddress();
  };

  render() {
    const B = props => <Text style={{ fontFamily: 'Source Sans Pro 600' }}>{props.children}</Text>;
    return (
      <View ref="suggest_park" style={styles.container}>
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
        <Text style={styles.question}>What is the <B>name</B> of this dog park?</Text>
        <Form style={styles.form} ref="SuggestedPark" onChange={this.handleFormChange}>
          <InputField
            ref="title"
            placeholder="Type Park Name"
            underlineColorAndroid="#EF3A39"
            style={styles.input}
          />
          <View style={styles.wrapper}>
            <Button
              bgimage={require('../../img/transparent.png')}
              text={"I don't know"}
              textColor="#8b8b8b"
              fontSize={15}
              font="Source Sans Pro 200"
              alignSelf="center"
              onPress={this.saveFormData}
            />
            <Button
              bgimage={require('../../img/red-gradient.png')}
              text=" OK "
              textColor="#fff"
              alignSelf="center"
              onPress={this.saveFormData}
            />
          </View>
        </Form>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
});


export default connect(mapStateToProps)(Survey_ParkName);
