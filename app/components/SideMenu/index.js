import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
			<TouchableOpacity style={styles.itemContainer}>
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