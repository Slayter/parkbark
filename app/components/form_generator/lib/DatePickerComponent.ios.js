import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Text, DatePickerIOS } from 'react-native';
import { Field } from './Field';

const formStyles = StyleSheet.create({
  form: {
  },
  alignRight: {
    marginTop: 7, position: 'absolute', right: 10
  },
  noBorder: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  separatorContainer: {
    // borderTopColor: '#C8C7CC',
    // borderTopWidth: 1,
    paddingTop: 35,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,
  },
  separator: {
    paddingLeft: 10,
    paddingRight: 10,
    color: '#6D6D72',
    paddingBottom: 7
  },
  fieldsWrapper: {
    // borderTopColor: '#afafaf',
    // borderTopWidth: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  fieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
  fieldValue: {
    fontSize: 34 / 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    paddingTop: 4,
    justifyContent: 'center',
    color: '#C7C7CC'
  },
  fieldText: {
    fontSize: 34 / 2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
  },
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


export class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date ? new Date(props.date) : '',
      isPickerVisible: false
    };
  }
  setDate(date) {
    this.setState({ date });
    if (this.props.onChange) {
      this.props.onChange((this.props.prettyPrint) ? this.props.dateTimeFormat(date) : date);
    }
    if (this.props.onValueChange) this.props.onValueChange(date);
  }
  handleLayoutChange = (e) => {
    const { x, y, width, height } = { ...e.nativeEvent.layout };

    this.setState(e.nativeEvent.layout);
    // e.nativeEvent.layout: {x, y, width, height}}}.
  };

  handleValueChange = (date) => {
    this.setState({ date });

    this.props.onChange && this.props.onChange((this.props.prettyPrint) ?
      this.props.dateTimeFormat(date, this.props.mode) : date);
    this.props.onValueChange && this.props.onValueChange(date);
  };
  // this.refs.picker.measure(this.getPickerLayout.bind(this));
  _togglePicker = (event) => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
    // this._scrollToInput(event);
    this.props.onPress && this.props.onPress(event);
  };

  render() {
    const {
      maximumDate,
      minimumDate,
      minuteInterval,
      mode,
      onDateChange,
      timeZoneOffsetInMinutes
    } = this.props;

    const valueString = this.props.dateTimeFormat(this.state.date, this.props.mode);

    const datePicker =
      <DatePickerIOS
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        minuteInterval={minuteInterval}
        mode={mode}
        timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
        date={this.state.date || new Date()}
        onDateChange={this.handleValueChange}
      />;

    const pickerWrapper = React.cloneElement(this.props.pickerWrapper, {
      onHidePicker: () => {
        this.setState({ isPickerVisible: false });
      }
    }, datePicker);

    let iconLeft = this.props.iconLeft;
    let iconRight = this.props.iconRight;

    if (iconLeft && iconLeft.constructor === Array) {
      iconLeft = (!this.state.isPickerVisible) ? iconLeft[0] : iconLeft[1];
    }
    if (iconRight && iconRight.constructor === Array) {
      iconRight = (!this.state.isPickerVisible) ? iconRight[0] : iconRight[1];
    }
    const placeholderComponent = (this.props.placeholderComponent) ?
      this.props.placeholderComponent :
      <Text style={[formStyles.fieldText, this.props.placeholderStyle]}>
        {this.props.placeholder}
      </Text>;
    return (
      <View>
        <Field
          {...this.props}
          ref="inputBox"
          onPress={this._togglePicker}
        >
          <View
            style={[
              formStyles.fieldContainer,
              formStyles.horizontalContainer,
              this.props.containerStyle]}
            onLayout={this.handleLayoutChange}
          >
            {(iconLeft) ? iconLeft : null}
            {placeholderComponent}
            <View
              style={[
                formStyles.alignRight,
                formStyles.horizontalContainer,
                this.props.valueContainerStyle]}
            >
              <Text style={[formStyles.fieldValue, this.props.valueStyle]}>{ valueString }</Text>
              {(iconRight) ? iconRight : null}
            </View>
          </View>
        </Field>
        {(this.state.isPickerVisible) ? pickerWrapper : null
        }
      </View>
    );
  }
}

DatePickerComponent.propTypes = {
  dateTimeFormat: PropTypes.func,
  pickerWrapper: PropTypes.element,
  prettyPrint: PropTypes.bool
};

DatePickerComponent.defaultProps = {
  pickerWrapper: <View />,
  dateTimeFormat: (date, mode) => {
    if (!date) return '';
    let value = '';
    switch (mode) {
      case 'datetime':
        // value = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        value = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        break;
      case 'time':
        value = date.toLocaleTimeString();
        break;
      case 'countdown':
        // value = date.getHours() + ":" + date.getMinutes();
        value = `${date.getHours()}:${date.getMinutes()}`;
        break;
      default:
        value = date.toLocaleDateString();
    }
    return value;
  }
};