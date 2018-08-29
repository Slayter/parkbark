import React, { Component } from 'react';
import {
  View,
  ListView,
  Animated,
  PanResponder,
  Easing,
  Text,
  Dimensions,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import Button from '../common/Button.js';
import ParkListDetail from './ParkListDetail.js';
import { getDistance } from '../../src/map_core';

const SHOW_LIST_ITEM_COUNT = 9;

const styles = {
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  },
  scrollViewTitle: {
    alignSelf: 'center',
    fontSize: 15
  },
  scrollViewHeader: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  listViewContainer: {
    height: Dimensions.get('window').height - 180,
    backgroundColor: '#fff'
  },
  listView: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  },
  noResults: {
    color: '#f88b8e',
    textAlign: 'center',
    fontSize: 30
  },
};

class ParkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: new Animated.Value(0),
      parks: this.sortParks(props.parks),
      showItemCount: 0,
    };
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.parks, this.props.parks)) {
      const parks = this.sortParks(newProps.parks);
      let showItemCount = SHOW_LIST_ITEM_COUNT;
      if (showItemCount > newProps.parks.length) {
        showItemCount = newProps.parks.length;
      }
      this.setState({ parks, showItemCount });
    }
  }

  componentDidUpdate() {
    if (this.props.hideState) {
      this.slideOut();
    }
  }

  onDetailPress = (title) => {
    this.props.dispatch({ type: 'UPDATE_SElECTED_PARK', state: title });
    this.props.navigation.navigate('parkdetail');
  };


  onNextPress = () => {
    Linking.canOpenURL('https://www.surveymonkey.com/r/QC3KVHS').then(supported => {
      if (supported) {
        Linking.openURL('https://www.surveymonkey.com/r/QC3KVHS');
      } else {
        console.log(`Don't know how to open URI: `, 'https://www.surveymonkey.com/r/QC3KVHS');
      }
    });
  };
  onEndReached = () => {
    let { showItemCount, parks } = this.state;
    if (showItemCount !== parks.length) {
      showItemCount += SHOW_LIST_ITEM_COUNT;
      if (showItemCount < parks.length) {
      } else {
        showItemCount = parks.length;
      }
      this.setState({ showItemCount });
      console.log('onEndReached', showItemCount);
    }
  };

  slideIn = () => {
    this.props.dispatch({ type: 'MAP_HIDE', state: false });
    Animated.timing(this.state.slideValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(0)
    }).start();
  };

  sortParks(parks) {
    const default_position = {
      latitude: 45.523031,
      longitude: -122.676772
    };
    const position = this.props.coords || default_position;
    // sort all parks by distance from users coordinates and include distance prop :)
    return parksSorted = parks.map((park) => {
      const parkCoords = park.address.split(',');
      park.distance =
        getDistance(position.latitude, position.longitude, parkCoords[0], parkCoords[1]);
      return park;
    }).sort(function(a, b) {
      return a.distance - b.distance;
    });
  }

  slideOut = () => {
    this.props.dispatch({ type: 'MAP_HIDE', state: false });
    Animated.timing(this.state.slideValue, {
      toValue: 0,
      duration: 1500,
      easing: Easing.elastic(1)
    }).start();
  };

  renderParkListDetails = (park, sectionIndex, rowIndex) => {
    const parkItem = (
      <ParkListDetail
        onPress={() => this.onDetailPress(park.title)}
        touchable={true}
        navigator={this.props.navigator}
        index={rowIndex}
        title={park.title}
        address={park.address}
        address_display={park.address_display}
        distance={park.distance}
        amenities={park.amenities}
      />
    );
    if (parseInt(rowIndex, 10) !== this.state.parks.length - 1) {
      return parkItem;
    }
    return (
      <View>
        {parkItem}
        {this.renderSuggestButton()}
      </View>
    );
  };
  renderSuggestButton() {
    return (
      <Button
        bgimage={require('../../img/red-gradient.png')}
        text="Suggest a park"
        alignSelf="stretch"
        textColor="#fff"
        font="Source Sans Pro 700"
        fontSize={15}
        onPress={this.onNextPress}
      />
    );
  }
  render() {
    const { parks, slideValue, showItemCount } = this.state;
    const bottom = slideValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-Dimensions.get('window').height - 180, 0]
    });
    const dataSource = this.dataSource.cloneWithRows(parks.slice(0, showItemCount));
    return (
      <View style={styles.scrollConainer}>
        <View style={[styles.scrollViewHeader, styles.overlay, { bottom: 0 }]}>
          <Button
            bgimage={require('../../img/transparent.png')}
            bgcolor="#fff"
            alignSelf="flex-start"
            text=" See Parks List "
            textColor="#131313"
            font="Source Sans Pro regular"
            fontSize={14}
            onPress={this.slideIn}
          />
        </View>
        <Animated.View style={[styles.overlay, { bottom }]}>
          <View style={styles.scrollViewHeader}>
            <Button
              bgimage={require('../../img/transparent.png')}
              alignSelf="flex-start"
              bgcolor="#fff"
              text=" Show Map "
              textColor="#131313"
              font="Source Sans Pro regular"
              fontSize={14}
              onPress={this.slideOut}
            />
          </View>
          {parks.length > 0 ?
            <View style={styles.listViewContainer}>
              <ListView
                style={styles.listView}
                dataSource={dataSource}
                renderRow={this.renderParkListDetails}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                enableEmptySections
              />
            </View>
            :
            <View style={{ backgroundColor: '#fff' }}>
              <Text style={styles.noResults}>No Parks Found</Text>
              {this.renderSuggestButton()}
            </View>
          }
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.getIn(['map', 'location', 'coords']),
  parks: state.getIn(['map', 'location', 'parks']),
  hideState: state.getIn(['map', 'hide'])
});

export default connect(mapStateToProps)(ParkList);
