import React, { Component } from 'react';
import {
	Text,
	View,
	Linking,
	StyleSheet, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Callout } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { googledistanceapi } from '../../api/googleapi.js';
import { getDistance } from '../../src/map_core';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	callout: {
		backgroundColor: '#fff',
		padding: 2,
		borderRadius: 2,
		position: 'relative',
		alignItems: 'center',
		elevation: 4,
		shadowColor: 'rgba(0,0,0,.24)',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	},
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
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderBottomWidth: 8,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor:"white",
		transform: [
			{ rotate: '180deg' }
		],
		margin: 0,
		marginBottom: 5,
		borderWidth: 0,
		borderColor:"transparent"
	}
});

class ParkMarkers extends Component {
  constructor() {
    super();
    this.onCalloutPress.bind(this);
    this.selectedMarker = {};
    this.state = { selected: null };
  }

  componentDidUpdate() {
    if (this.state.selected !== null && this.selectedMarker[this.state.selected] !== null) {
      this.selectedMarker[this.state.selected].showCallout();
    }
  }

  onCalloutPress(title) {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    // this.props.navigator.push({name:'parkdetail'});
    Actions.parkdetail();
  }

  render() {
    const default_position = {
      latitude: 45.523031,
      longitude: -122.676772
    };
    // const position = this.props.coords || default_position;
    const position = default_position;

    return (
      <View>
        {this.props.markers.map((marker, i) =>
          <MapView.Marker
            ref={(ref) => { this.selectedMarker[marker.title] = ref; }}
            onPress={() => this.setState({ selected: marker.title })}
            key={marker.title + i}
            coordinate={marker.latlng}
            image={require('../../img/map-pin.png')}
            title={marker.title}
            description={marker.address_display + ' apx. ' + getDistance(position.latitude, position.longitude, marker.latlng.latitude, marker.latlng.longitude) + ' mi'}
            onCalloutPress={() => this.onCalloutPress(marker.title)}
          >
            <Callout tooltip={true} style={{ elevation: 4 }}>
              <View style={{ elevation: 4 }}>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 4 }}>
                  <View style={{ flex: 1 }}>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginBottom: 5
											}}
										>
											<Text
												style={{
													color: 'black',
													fontSize: 16,
													fontWeight: 'bold',
													fontFamily: 'Source Sans Pro regular',
												}}
											>
												{marker.title}
											</Text>
											<Text
												style={{
													color: '#F58120',
													fontSize: 14,
													marginLeft: 20,
													fontFamily: 'Source Sans Pro regular',
												}}
											>
												{`${getDistance(position.latitude, position.longitude, marker.latlng.latitude, marker.latlng.longitude)} mi`}
											</Text>
										</View>
                  </View>
									<Text
                    style={{
                      color: '#6E6E6E',
                      fontSize: 14,
											fontFamily: 'Source Sans Pro regular',
                    }}
                  >
										{marker.address_display}
									</Text>
                </View>
								<View style={styles.triangle} />
              </View>
            </Callout>
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
