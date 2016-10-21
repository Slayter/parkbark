import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/survey_core';
import Button from './common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

class Survey_NumDogs extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{
          num_dogs: 5
      },
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  saveFormData() {
      const updateValue = {};
      updateValue.title = 'num_dogs';
      updateValue.value = this.state.formData.num_dogs;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.props.navigator.push({name: 'surveyDrinkingWater'});
  }

  addNumber(formData) {
      var newFormData = this.state.formData;
      newFormData.num_dogs = parseInt(this.state.formData.num_dogs) + 1;
      this.setState({formData: newFormData});
      this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  }

  subtractNumber(formData) {
      var newFormData = this.state.formData;
      newFormData.num_dogs = parseInt(this.state.formData.num_dogs) - 1;
      this.setState({formData: newFormData});
      this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  }

  componentDidMount() {
    // console.log(this.state.formData);
  }

    render() {
        let value = this.state.formData.num_dogs.toString();
        return (
            <View
                ref='surveyForm'
                style={styles.form}
            >
                       <Form
                           ref='surveyFormNumDogs'
                           onChange={this.handleFormChange.bind(this)}
                       >
                           <Text>How many dogs do you see at the park?</Text>
                           <InputField
                               ref='num_dogs'
                               value={value}
                           />
                           <Button bgcolor={'#f0382c'} text={' + '} onPress={this.addNumber.bind(this)}/>
                           <Button bgcolor={'#f0382c'} text={' - '} onPress={this.subtractNumber.bind(this)}/>

                      </Form>
              <Button bgcolor={'#E79C23'} text={' OK '} onPress={this.saveFormData.bind(this)}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    form: {
        flex: 0,
        padding: 30,
    },
    close: {
        marginTop: 30,
        textAlign: 'right',
        marginRight: 10,
    },
    container: {
      flex: 0,
      justifyContent: 'center',
      padding: 50,
    }
});

const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS()
  }
}

export default connect(mapStateToProps)(Survey_NumDogs);