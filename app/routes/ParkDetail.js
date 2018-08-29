import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';
// var ResponsiveImage = require('react-native-responsive-image');
import Share from 'react-native-share';
import Button from '../components/common/Button';
import Card from '../components/common/Card.js';
import CardSection from '../components/common/CardSection.js';
import Amenity from '../components/amenity_filter/Amenity.js';
import ParkListDetail from '../components/park_list/ParkListDetail.js';
import FilterDetail from '../components/amenity_filter/FilterDetail';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  scrollview: {
  },
  imageWrapper: {
    alignItems: 'stretch'
  },
  image: {
    height: 20
  },
  parkImage: {
    justifyContent: 'center',
    alignItems: 'stretch',
    zIndex: 0
  },
  parkDetails: {
    borderColor: '#f0f0f0',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  detailsTitle: {
    fontFamily: 'ArchivoNarrow-Bold',
    fontSize: 11,
    color: '#838383',
    lineHeight: 19,
    paddingTop: 10 // reduced by half
  },
  detailsText: {
    fontFamily: 'Source Sans Pro 200',
    fontSize: 14,
    color: '#5e5e5e',
    lineHeight: 20
  }
});


class ParkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.pushToadCTA);
  }

  componentDidMount() {
    const { currentPark } = this.props;
    if (__DEV__) {
      console.log(this.bannerError);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.pushToadCTA);
  }

  onBackPress = () => {
    if (this.props.adsRemoved) {
      this.props.navigation.goBack();
    }
    this.props.navigation.navigate('adCTA');
  };

  onSharePress = () => {
    const shareOptions = {
      title: 'Park Bark is Awesome',
      message: 'Hello!',
      url: 'http://parkbarkapp.site',
      subject: `Check out ${this.props.currentPark.title}`
    };
    Share.open(shareOptions);
  };

  onDetailPress = () => {
    const lat = parseInt(this.props.currentPark.address.split(',')[0], 10);
    const long = parseInt(this.props.currentPark.address.split(',')[1], 10);
    // IOS
    // var url = 'http://maps.apple.com/?daddr=' + this.props.currentPark.address;
    // ANDROID
    Linking.openURL(`http://maps.google.com/maps?daddr=${this.props.currentPark.address}`);
  };

  pushToadCTA = () => {
    if (this.props.adsRemoved) {
      return this.props.navigation.goBack();
    }
	  this.props.navigation.navigate('adCTA');
    return true;
  };

  surveyPress = () => {
    Linking.canOpenURL('https://www.surveymonkey.com/r/QQ2LRH6').then(supported => {
      if (supported) {
        Linking.openURL('https://www.surveymonkey.com/r/QQ2LRH6');
      } else {
        console.log(`Don't know how to open URI: `, 'https://www.surveymonkey.com/r/QQ2LRH6');
      }
    });
  };

  renderFilters() {
    const currentParkAmenities = this.props.currentPark.amenities.split(',').map(amenity => amenity.trim());
    const matchingAmenities = [];
    const nonMatchingAmenities = [];

    // push matching amenities not rendered as images into array for rendering.
    this.props.amenities.map((filter) => {
      if (currentParkAmenities.indexOf(filter.name) > -1 &&
        currentParkAmenities.indexOf(filter.name) > 2) {
        filter.checked = true;
        matchingAmenities.push(filter);
      }
    });

    const amenities = matchingAmenities;
    return amenities.map(filter => (
      <FilterDetail
        checked={filter.checked}
        disabled={true}
        key={filter.name}
        filter={filter.name}
        inactive={true}
      />
    ));
  }

  renderAmenities({ amenities }) {
    let amenityIndex = 0;
    return amenities.split(', ').map(amenity => (
      <Amenity
        index={amenityIndex++}
        key={amenity}
        amenity={amenity}
      />
    ));
  }

  render() {
    const { currentPark } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView bounces={false} style={styles.scrollview}>
          {/* Start top image stack */}
          <View style={styles.parkImage}>
            <ResponsiveImage
              source={currentPark.image ? { uri: currentPark.image } : require('../img/park_placeholder.png')}
              initHeight="225"
            />
          </View>
          <View style={{ position: 'absolute', top: 0 }}>
            <ResponsiveImage
              source={require('../img/gradient.png')}
              initHeight="108"
              initWidth="621"
            />
          </View>
          <TouchableOpacity
            onPress={this.onBackPress}
            style={{ position: 'absolute', top: 20, left: 20 }}
          >
            <Image style={{ width: 25, height: 25, padding: 10 }} source={require('../img/back-arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSharePress}
            style={{ position: 'absolute', top: 20, right: 20 }}
          >
            <Image style={{ width: 25, height: 27, padding: 10 }} source={require('../img/share.png')} />
          </TouchableOpacity>
          {/* End top image stack */}
          <ParkListDetail
            key={currentPark.title}
            onPress={this.onDetailPress}
            title={currentPark.title}
            address={currentPark.address}
            address_display={currentPark.address_display}
            distance={currentPark.distance}
          />
          <Card>
            {this.renderAmenities(currentPark)}
          </Card>
          { this.props.adsRemoved ? null :
            <Card>
              <CardSection>
                <AdMobBanner
                  adSize="banner"
                  //   adUnitID="ca-app-pub-3940256099942544/6300978111" // test
                  adUnitID="ca-app-pub-7642882868968646/2620967210" // Park Bark test
                  testDeviceID="EMULATOR"
                  didFailToReceiveAdWithError={this.bannerError}
                />
              </CardSection>
            </Card>
          }
          { currentPark.details.length ?
            <Card>
              <CardSection>
                <View style={styles.parkDetails}>
                  <Text style={styles.detailsTitle}>PARK DETAILS</Text>
                  <Text style={styles.detailsText}>{currentPark.details}</Text>
                </View>
              </CardSection>
            </Card>
            : null}
          {this.renderFilters()}
        <Button
          bgimage={require('../img/orange-gradient.png')}
          icon={require('../img/check-in.png')}
          text="  CHECK IN "
          textColor="#fff"
          alignSelf="flex-end"
          fontSize={14}
          font="Source Sans Pro 700"
          onPress={this.surveyPress}
        />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  amenities: state.getIn(['filter', 'amenities']).toJS(),
  currentPark: state.getIn(['map', 'location', 'parks']).find(park => park.title === state.getIn(['parkdetail', 'current_park'])),
  position: state.getIn(['map', 'position']),
  adsRemoved: state.getIn(['core', 'adsRemove'])
});

export default connect(mapStateToProps)(ParkDetail);
