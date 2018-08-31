import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white', // EF3A39
	},
	headerContainer: {
		height: 120,
		backgroundColor: '#EF3A39',
		justifyContent: 'flex-end'
	},
	headerText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Source Sans Pro regular'
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
		fontSize: 15,
		fontFamily: 'Source Sans Pro regular'
	},
	mainSubContainer: {
		marginTop: 50
	},
	tokenContainer: {
		position: 'absolute',
		right: 10,
		top: 10,
		minWidth: 60,
		height: 26,
		borderRadius: 13,
		backgroundColor: 'rgba(121, 2, 2, 0.19)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 6,
		paddingLeft: 11
	},
	imgToken: {
		height: 13,
		resizeMode: 'contain',
		marginLeft: 5
	},
	imgVIPToken: {
		resizeMode: 'contain',
		marginLeft: 5,
		height: 13.5
	},
	whiteText: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Source Sans Pro regular',
		fontWeight: '600',
		lineHeight: 18
	}
});
