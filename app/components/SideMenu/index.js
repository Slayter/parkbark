import React, { Component } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Platform,
	Linking,
	Image
} from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { styles } from './styles';

export class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [
				{ index: 0, label: 'Buy more tokens' },
				{ index: 1, label: 'Rate Park Bark' },
				{ index: 2, label: 'Help us improve' }
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
			case 1:
				Rate.rate(options, (success) => {
					if (success) {
						// this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
						console.info('success', success);
					}
				});
				break;
			case 2:
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
		const isVIP = false;
		return (
			<View style={styles.headerContainer}>
				<View style={styles.headerSubContainer}>
					<Text style={styles.headerText}>
						Hi
					</Text>
				</View>
				{!isVIP &&
				<View style={styles.tokenContainer}>
					<Text style={styles.whiteText}>
						3
					</Text>
					<Image style={styles.imgToken} source={require('./../../img/icon_coin.png')} />
				</View>}
				{isVIP &&
				<View style={styles.tokenContainer}>
					<Text style={styles.whiteText}>
						VIP
					</Text>
					<Image style={styles.imgVIPToken} source={require('./../../img/icon_vip.png')} />
				</View>}
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
				<View style={styles.mainSubContainer}>
					<TouchableOpacity style={styles.itemContainer}>
						<Text style={styles.itemText}>
							Login
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.itemContainer}>
						<Text style={styles.itemText}>
							Log out
						</Text>
					</TouchableOpacity>
				</View>
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