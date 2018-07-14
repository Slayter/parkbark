import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white', // EF3A39
	},
	headerContainer: {
		height: 150,
		backgroundColor: '#EF3A39',
		justifyContent: 'flex-end'
	},
	headerText: {
		color: 'white',
		fontSize: 18
	},
	headerSubContainer: {
		marginLeft: 30,
		marginBottom: 20,
	},
	mainContainer: {
		marginLeft: 30,
		marginTop: 10
	},
	itemContainer: {
		height: 50,
		justifyContent: 'center'
	},
	itemText: {
		color: '#3B3B3B',
		fontSize: 15
	}
});
