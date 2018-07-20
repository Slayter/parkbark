import React, { Component } from 'react';
import { Map } from 'immutable';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';
import {fetchLocationAction} from '../../src/search_core';
import {googleapi} from '../../api/googleapi.js';

const styles = StyleSheet.create({
	fieldContainer: {
		backgroundColor: '#fff',
		position: 'absolute',
		zIndex: 2,
		top: 20,
		left: 10,
		right: 10,
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2 },
		shadowOpacity: 0.24,
		shadowRadius: 4,
		elevation: 4,
		borderRadius: 2,
		paddingVertical: 7
	},
	inputWrapper: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 7,
	},
	searchIcon: {
		marginRight: 5,
		marginLeft: 7,
		width: 20,
		resizeMode: 'contain'
	},
	filterIconWrapper: {
		backgroundColor: '#fff',
		alignItems: 'center',
		marginRight: 5,
		marginLeft: 5
	},
	input: {
		// maxWidth: 250,
		// fontSize: 13,
		paddingTop: 0,
		paddingBottom: 0,
		color: '#8B8B8B',
		fontFamily: 'Source Sans Pro regular',
		lineHeight: 23,
		flex: 1,
		marginLeft: 15
	}
});

class SearchFieldComponent extends Component {
  render() {
    return (
			<View style={styles.fieldContainer}>
				{this.searchParksInput()}
				<TextInput
					onChangeText={this.handleChange.bind(this)}
					// placeholder="Address, Zip, City"
					placeholder="Search location"
					placeholderTextColor="#8B8B8B"
					underlineColorAndroid="rgba(0,0,0,0)"
					style={styles.input}
					onSubmitEditing={this.fetchParks.bind(this)}
				/>
				{this.searchParksFilter()}
			</View>
    )
  }

  handleChange(text) {
    this.props.dispatch({
      type: 'UPDATE_SEARCH',
      state: {
        search: text
      }
    });
  }

  searchParksInput() {
    return <TouchableOpacity
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        underlayColor="gray"
        // onPress={this.fetchParks.bind(this)}>
        onPress={this.props.onShowDrawer}>
      <Image source={require('../../img/icon_hamburger.png')} style={styles.searchIcon}/>
    </TouchableOpacity>
  }

  searchParksFilter(){
   return <TouchableOpacity
        underlayColor="gray"
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        onPress={this.props.onPress}
        style={styles.filterIconWrapper}>
      <Image source={require('../../img/empty_filter.png')} style={styles.filterIcon}/>
    </TouchableOpacity>
  }

  fetchParks() {
    if (this.props.search !== undefined && this.props.search.search.length) {
      fetchLocationAction(this.props.search.search, googleapi).done((state) => {
        if (state === 'no location alert') {
          Alert.alert(
              'No Location Found',
              'Your location was not found, please try another search',
              [
                {text: 'OK', onPress: () => {return}},
              ]
          )
        } else {
          this.props.dispatch({type: 'UPDATE_REGION', state: state});
        }
      });
    }
  }
}

const mapStateToProps = state => ({
  search: state.getIn(['search', 'search'])
});

export default connect(mapStateToProps)(SearchFieldComponent);
