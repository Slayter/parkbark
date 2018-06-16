import React from 'react';
import { View, Text, Image } from 'react-native';
import CardSection from '../common/CardSection.js';

const Amenity = (props) => {
  // Map icons to amenities
  let icon = null;
  switch (props.amenity) {
    case 'Agility Course':
      icon = require('../../img/amenities/agility.png');
      break;
    case 'Benches':
      icon = require('../../img/amenities/benches.png');
      break;
    case 'Covered Area':
      icon = require('../../img/amenities/covered_area.png');
      break;
    case 'Fenced Area':
      icon = require('../../img/amenities/fenced.png');
      break;
    case 'Off Leash':
      icon = require('../../img/amenities/off_leash.png');
      break;
    case 'Poop Bags':
      icon = require('../../img/amenities/poop_bags.png');
      break;
    case 'Restrooms':
      icon = require('../../img/amenities/restrooms.png');
      break;
    case 'Shade':
      icon = require('../../img/amenities/shade.png');
      break;
    case 'Small Dogs Park':
      icon = require('../../img/amenities/small_dog.png');
      break;
    case 'Swimming Area':
      icon = require('../../img/amenities/swimming_area.png');
      break;
    case 'Hiking Trails':
      icon = require('../../img/amenities/trails.png');
      break;
    case 'Water Available':
      icon = require('../../img/amenities/water.png');
      break;
    default:
      if (__DEV__) {
        console.log('no amenity icon');
      }
  }

  let topAmenities;
  if (props.index < 3) {
    topAmenities =
      <View style={{
      	flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minWidth: 95,
				maxHeight: 50
      }}>
				<Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={icon} />
				<Text
					style={{
					fontSize: 11,
					color: '#5e5e5e',
					fontFamily: 'Source Sans Pro 200',
					marginBottom: 10
				}}>
					 {props.amenity}
				 </Text>
      </View>;
  }
  return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
			<CardSection>
			 { topAmenities }
			</CardSection>
		</View>
  );
};

export default Amenity;
