import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Map from '../routes/Map';
import Landing from '../routes/Landing';
import ThankYou from '../routes/ThankYou';
import ParkDetail from '../routes/ParkDetail';
import FilterList from '../components/amenity_filter/FilterList';
import AdInterstitial from '../components/ads/AdInterstitial';
import { SideMenu } from '../components/SideMenu';


// class NavigatorComponent extends Component {
//   constructor() {
//     super();
//     this.state = {
//     };
//   }
//
//
//   render() {
//     return (
//       <Router>
//         <Scene key="root">
//           <Scene hideNavBar={true} key="landing" component={Landing} initial={true} />
// 					<Drawer
//             key="drawerMenu"
//             contentComponent={SideMenu}
//             drawerWidth={280}
// 						hideNavBar
// 						hideDrawerButton={true}
// 					>
//             <Scene hideNavBar={true} key="map" component={Map} />
// 					</Drawer>
//           <Scene hideNavBar={true} key="thanks" component={ThankYou} />
//           <Scene hideNavBar={true} key="parkdetail" component={ParkDetail} />
//           <Scene hideNavBar={true} key="adCTA" panHandlers={null} component={AdInterstitial} />
//           <Scene hideNavBar={true} key="filterlist" component={FilterList} />
//         </Scene>
//       </Router>
//     );
//   }
//
//
// }

const DrawerNavigation = DrawerNavigator({
	map: { screen: Map }
}, {
	gesturesEnabled: false,
	contentComponent: (props) => <SideMenu {...props} />
});

const NavigatorComponent = StackNavigator({
	initialRouteName: { screen: Landing },
	landing: { screen: Landing },
	thanks: { screen: ThankYou },
	parkdetail: { screen: ParkDetail },
	adCTA: { screen: AdInterstitial },
	filterlist: { screen: FilterList },
	drawerMenu: { screen: DrawerNavigation }
}, {
	headerMode: 'none',
	gesturesEnabled: false,
});
export default NavigatorComponent;
