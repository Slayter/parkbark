import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Linking } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { styles } from './styles';

export class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [
				{ index: 0, label: 'Rate Park Bark' },
				{ index: 1, label: 'Help us improve' }
			]
		}
	}
	
	onPress = (index) => {
		let options = {
			GooglePackageName: 'com.parkbark',
			AmazonPackageName: 'com.parkbark',
			preferredAndroidMarket: Platform.OS !== 'ios' ? AndroidMarket.Google : AndroidMarket.Amazon,
			fallbackPlatformURL:"http://parkbarkapp.site"
		};
		switch (index) {
			case 0:
				Rate.rate(options, (success) => {
					if (success) {
						// this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
						console.info('success', success);
					}
				});
				break;
			case 1:
				Linking.canOpenURL('https://www.surveymonkey.com/r/WRS5D5V').then(supported => {
					if (supported) {
						Linking.openURL('https://www.surveymonkey.com/r/WRS5D5V');
					} else {
						console.log("Don't know how to open URI: ", 'https://www.surveymonkey.com/r/WRS5D5V');
					}
				});
				break;
			default:
				break;
		}
	};
	
	renderHeaderContainer = () => {
		return (
			<View style={styles.headerContainer}>
				<View style={styles.headerSubContainer}>
					<Text style={styles.headerText}>
						Login or Sign up
					</Text>
				</View>
			</View>
		);
	};
	
	renderItem = ({ item }) => {
		return (
			<TouchableOpacity style={styles.itemContainer} onPress={() => this.onPress(item.index)}>
				<Text style={styles.itemText}>
					{item.label}
				</Text>
			</TouchableOpacity>
		);
	};
	
	renderMainContent = () => {
		const { item } = this.state;
		return (
			<View style={styles.mainContainer}>
				<FlatList
					keyExtractor={(item, index) => `key-${index}`}
					data={item}
					renderItem={this.renderItem}
				/>
			</View>
		)
	};

	render() {
		return (
			<View style={styles.container}>
				{this.renderHeaderContainer()}
				{this.renderMainContent()}
			</View>
		);
	}
}