import React, { Component } from 'react';
import {
	Text,
	View,
	Linking,
	StyleSheet, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import MapView, { Callout } from 'react-native-maps';
import Svg,{
	Circle,
	Ellipse,
	G,
	LinearGradient,
	RadialGradient,
	Line,
	Path,
	Polygon,
	Polyline,
	Rect,
	Symbol,
	Use,
	Defs,
	Stop
} from 'react-native-svg';
import { googledistanceapi } from '../../api/googleapi.js';
import { getDistance } from '../../src/map_core';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	// callout: {
	// 	backgroundColor: '#fff',
	// 	padding: 2,
	// 	borderRadius: 2,
	// 	position: 'relative',
	// 	alignItems: 'center',
	// 	elevation: 4,
	// 	shadowColor: 'rgba(0,0,0,.24)',
	// 	shadowOffset: { width: 0, height: 2 },
	// 	shadowRadius: 4,
	// },
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontFamily: 'Source Sans Pro regular',
		fontSize: 14,
		color: '#131313',
		lineHeight: 23
	},
	address: {
		fontFamily: 'Source Sans Pro 200',
		fontSize: 12,
		color: '#5e5e5e',
		lineHeight: 23
	},
	distance: {
		color: '#f58120',
		fontSize: 14,
		fontFamily: 'Source Sans Pro regular',
		lineHeight: 23,
		marginLeft: 5
	},
	triangle: {
	  alignSelf: 'center',
		width: 0,
		height: 0,
		backgroundColor: 'black',
		borderStyle: 'solid',
		borderLeftWidth: 15,
		borderRightWidth: 15,
		borderBottomWidth: 18,
		borderLeftColor: 'red',
		borderRightColor: 'blue',
		borderBottomColor: '#DBDBDB',
		transform: [
			{ rotate: '180deg' }
		],
		margin: 0,
		marginBottom: 5,
		borderWidth: 0,
		borderColor: 'steelblue'
	},
	tooltipMainContainer: {
		backgroundColor: 'white',
		borderRadius: 4,
		padding: 10,
		borderColor: '#DBDBDB',
		borderWidth: 1,
	},
	tooltipSubContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tooltipTitleText: {
		color: 'black',
		fontSize: 16,
		fontFamily: 'Source Sans Pro 700',
		maxWidth: (width / 4) * 3
	},
	tooltipDescriptionText: {
		color: '#F58120',
		fontSize: 14,
		marginLeft: 10,
		fontFamily: 'Source Sans Pro regular',
		marginTop: 1
	},
	tooltipDescriptionText1: {
		color: '#6E6E6E',
		fontSize: 14,
		fontFamily: 'Source Sans Pro regular',
		maxWidth: (width / 4) * 3
	},
	calloutSubContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 9,
		height: 13,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	subContainer1: {
		width: 13,
		height: 1,
		backgroundColor: 'white'
	},
	subContainer2: {
		width: 15,
		height: 1.5,
		backgroundColor: 'white'
	}
});

class ParkMarkers extends Component {
  constructor() {
    super();
    this.selectedMarker = {};
    this.state = {
    	selected: null,
			markers: []
    };
  }
  
  componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props.markers, nextProps.markers)) {
			this.setState({ markers: nextProps.markers }, () => {
				if (this.state.selected !== null && this.selectedMarker[this.state.selected] !== null) {
					setTimeout(() => this.selectedMarker[this.state.selected].showCallout(), 0);
				}
			});
		}
	}
  
  onPress = (marker) => {
		this.setState({ selected: marker.title });
	};

  onCalloutPress = (title) => {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    // this.props.navigator.push({name:'parkdetail'});
	  this.props.navigation.navigate('parkdetail');
  };

  render() {
  	const { markers } = this.state;
    const default_position = {
      latitude: 45.523031,
      longitude: -122.676772
    };
    const position = this.props.coords || default_position;
    // const position = default_position;
    return (
      <View>
        {markers.map((marker, i) =>
          <MapView.Marker
            ref={(ref) => { this.selectedMarker[marker.title] = ref; }}
            onPress={() => this.onPress(marker)}
						key={i + marker.title}
            coordinate={marker.latlng}
            image={require('../../img/map-pin.png')}
						onCalloutPress={() => this.onCalloutPress(marker.title)}
					>
            <MapView.Callout tooltip={true}>
							<View>
								<View style={styles.tooltipMainContainer}>
									<View style={styles.tooltipSubContainer}>
										<Text style={styles.tooltipTitleText} numberOfLines={2}>
											{marker.title}
										</Text>
										<Text style={styles.tooltipDescriptionText}>
											{`${getDistance(position.latitude, position.longitude, marker.latlng.latitude, marker.latlng.longitude)} mi`}
										</Text>
									</View>
									<Text style={styles.tooltipDescriptionText1} numberOfLines={2}>
										{marker.address_display}
									</Text>
								</View>
								<View style={{ alignItems: 'center', justifyContent: 'center' }}>
									<Svg height="10" width="16">
										<Polygon
											points="16,0 0,0 8,10"
											fill="white"
											stroke="#DBDBDB"
											strokeWidth="1"
										/>
									</Svg>
								</View>
							</View>
							<View style={styles.calloutSubContainer}>
								<View style={styles.subContainer2} />
								<View style={styles.subContainer1} />
							</View>
            </MapView.Callout>
          </MapView.Marker>)}
      </View>
    );
  }
}

// {/*<MapView.Callout style={styles.callout}>*/}
//   {/*<View>*/}
//     {/*<View style={styles.top}>*/}
//       {/*<Text style={styles.title}>{marker.title}</Text>*/}
//       {/*<Text style={styles.distance}>{getDistance(this.props.coords.latitude, this.props.coords.longitude, marker.latlng.latitude, marker.latlng.longitude) + 'mi'}</Text>*/}
//     {/*</View>*/}
//     {/*<Text style={styles.address}>{marker.address_display}</Text>*/}
//   {/*</View>*/}
// {/*</MapView.Callout>*/}

const mapStateToProps = state => ({
  coords: state.getIn(['map', 'location', 'coords']),
  // position: state.getIn(['map','position']),
  markers: state.getIn(['map', 'location', 'parks'])
});


export default connect(mapStateToProps)(ParkMarkers);
