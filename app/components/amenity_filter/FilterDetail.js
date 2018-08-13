import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	itemContainer: {
		marginHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		height: 50
	},
	subContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconImg: {
		resizeMode: 'contain',
		width: 20,
		height: 25
	}
});

class FilterDetail extends Component {
  // adds staged for add or remove prop to park amenity object in immutable state.
  onPress = () => {
    const { currentFilterIndex } = this.props;
    const { staged, selected } = this.props.currentFilter;
    if (staged === 'add' || selected) {
      this.props.dispatch({ type: 'REMOVE_STAGED_FILTER', state: currentFilterIndex });
      this.fontFamily = 'Source Sans Pro 200';
      this.image = null;
    }
    if (!staged & !selected || staged === 'remove') {
      this.props.dispatch({ type: 'ADD_STAGED_FILTER', state: currentFilterIndex });
      this.fontFamily = 'Source Sans Pro 700';
      this.image = require('../../img/Ok.png');
    }
  };
  
  onGetSvgUri = (name, status) => {
    let uri = null;
    switch (name) {
      case 'Lights':
      	if (status) {
					uri = require('../../img/amenities/red_lights.png');
				} else {
					uri = require('../../img/amenities/lights.png');
				}
        break;
			case 'Off Leash':
				if (status) {
					uri = require('../../img/amenities/red_off_leash.png');
				} else {
					uri = require('../../img/amenities/off_leash.png');
				}
				break;
			case 'Poop Bags':
				if (status) {
					uri = require('../../img/amenities/red_poop_bags.png');
				} else {
					uri = require('../../img/amenities/poop_bags.png');
				}
				break;
			case 'Restrooms':
				if (status) {
					uri = require('../../img/amenities/red_restrooms.png');
				} else {
					uri = require('../../img/amenities/restrooms.png');
				}
				break;
			case 'Shade':
				if (status) {
					uri = require('../../img/amenities/red_shade.png');
				} else {
					uri = require('../../img/amenities/shade.png');
				}
				break;
			case 'Small Dogs Park':
				if (status) {
					uri = require('../../img/amenities/red_small_dog.png');
				} else {
					uri = require('../../img/amenities/small_dog.png');
				}
				break;
			case 'Swimming Area':
				if (status) {
					uri = require('../../img/amenities/red_swimming_area.png');
				} else {
					uri = require('../../img/amenities/swimming_area.png');
				}
				break;
			case 'Trails':
				if (status) {
					uri = require('../../img/amenities/red_trails.png');
				} else {
					uri = require('../../img/amenities/trails.png');
				}
				break;
			case 'Wash Station':
				if (status) {
					uri = require('../../img/amenities/red_wash.png');
				} else {
					uri = require('../../img/amenities/wash.png');
				}
				break;
			case 'Agility Course':
				if (status) {
					uri = require('../../img/amenities/red_agility.png');
				} else {
					uri = require('../../img/amenities/agility.png');
				}
				break;
      default:
        break;
		}
		return uri;
  };

  render() {
    const { staged, selected } = this.props.currentFilter;
    let svgColor = '#000';
    let status = false;
    if (selected || staged === 'add') {
			this.fontFamily = 'Source Sans Pro Bold';
      this.image = require('../../img/Ok.png');
      svgColor = '#ff0000';
			status = true;
    }
    if (!staged & !selected || staged === 'remove') {
      this.fontFamily = 'Source Sans Pro 200';
      this.image = null;
			svgColor = '#000';
			status = false;
    }

    if (this.props.checked) {
      this.fontFamily = 'Source Sans Pro Bold';
      this.image = require('../../img/Ok.png');
			svgColor = '#ff0000';
			status = true;
		}
		if (this.props.inactive) {
			this.fontFamily = 'Source Sans Pro 200';
			this.image = null;
			svgColor = '#000';
			status = false;
		}

    const source = this.onGetSvgUri(this.props.filter, status);

    return (
			<TouchableOpacity
				disabled={this.props.disabled}
				onPress={this.onPress}
				style={styles.itemContainer}
			>
				<View style={styles.subContainer}>
					<Image style={styles.iconImg} source={source} />
					<Text style={{ fontFamily: this.fontFamily, marginLeft: 15, color: svgColor, fontSize: 16 }} >{this.props.filter}</Text>
				</View>
			</TouchableOpacity>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  currentFilterIndex: state.getIn(['filter', 'amenities']).toJS().findIndex(a => a.name === ownProps.filter),
  currentFilter: state.getIn(['filter', 'amenities']).toJS().find(a => a.name === ownProps.filter)
});


export default connect(mapStateToProps)(FilterDetail);
