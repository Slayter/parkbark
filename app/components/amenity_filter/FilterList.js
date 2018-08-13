import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Button from '../common/Button';
import FilterListDetail from './FilterDetail';
import { updateParksByFilterAction } from '../../src/filter_core';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  filterScrollView: {
    padding: 10,
    marginBottom: 20
  },
  filterTitle: {
    color: '#ef3a39',
    fontFamily: 'Source sans pro 600',
    fontSize: 16,
    lineHeight: 20
  },
  buttonWrapper: {
    marginTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  closeButton: {
    marginLeft: 10,
    width: 20,
    height: 20,
		justifyContent: 'center'
  },
  closeIcon: {
    width: 15,
    height: 15,
    opacity: 0.67,
    resizeMode: 'contain'
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    color: '#131313'
  },
  filterContainer: {
    marginRight: 10
  }
};


class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'UPDATE_SCENE', state: this.props.name });
  }

  // concatenates selected filters, sends query to db with action, and updates annotations (markers) on complete
  componentWillUnmount() {
    const { selectedFilters, dispatch, coords } = this.props;
    const filterQuery = selectedFilters.reduce((p, n, i) => {
      if (i !== 0) {
        // return p + ',' + n.name
        return `${p},${n.name}`;
      }
      // return p + n.name
      return `${p}${n.name}`;
    }, '');
    dispatch({ type: 'QUERY_SET', state: filterQuery });
    const dist = Math.ceil((coords.latitudeDelta * 69) / 2);
    // const filteredCoords = coords.latitude + ',' + coords.longitude;
    const filteredCoords = `${coords.latitude},${coords.longitude}`;
    updateParksByFilterAction(filteredCoords, dist, filterQuery).done((state) => {
      dispatch({ type: 'UPDATE_ANNOTATIONS', state });
    });
  }

  // clears staged when back is press, does not clear selected
  onBackPress = () => {
    this.props.dispatch({ type: 'CLEAR_STAGED', state: false });
    // this.props.navigator.pop();
    Actions.pop();
  };

  // filters according to staged and selected, filter button must be pressed to add staged to selected
  onFilterPress = () => {
    const {
      dispatch, stagedFilters, stagedFiltersRemove
    } = this.props;
    dispatch({ type: 'CLEAR_STAGED', state: false });
    stagedFilters.forEach(i => dispatch({ type: 'ADD_FILTER', state: i }));
    stagedFiltersRemove.forEach(i => dispatch({ type: 'REMOVE_FILTER', state: i }));
    dispatch({ type: 'FILTER_SET', state: true });
    Actions.pop();
  };

  // clears all staged and selected on press
  onClearFiltersPress = () => {
    this.props.dispatch({ type: 'CLEAR_FILTERS', state: false });
    this.props.dispatch({ type: 'CLEAR_STAGED', state: false });
    this.props.dispatch({ type: 'FILTER_SET', state: false });
  };

  // renders all FilterDetail components
  renderFilters() {
    console.info('this.props.amenities', this.props.amenities);
    return this.props.amenities.map(filter => (
      <FilterListDetail disabled={false} key={filter.name} filter={filter.name} />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity*/}
          {/*onPress={this.onBackPress}*/}
          {/*style={{*/}
            {/*position: 'absolute', top: 30, left: 15, zIndex: 1*/}
          {/*}}*/}
        {/*>*/}
          {/*<Image style={{ width: 20, height: 20, opacity: 0.67 }} source={require('../../img/button_close.png')} />*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={this.onBackPress}>
						<Image style={styles.closeIcon} source={require('../../img/button_close.png')} />
          </TouchableOpacity>
					<Text style={styles.headerText}>
						Amenities
					</Text>
					<TouchableOpacity style={styles.filterContainer} onPress={this.onFilterPress}>
						<Text style={styles.filterTitle}>
              Filter
            </Text>
					</TouchableOpacity>
        </View>
        <ScrollView style={styles.filterScrollView}>
          {this.renderFilters()}
          {/*<View style={styles.buttonWrapper}>*/}
            {/*<Button*/}
              {/*bgimage={require('../../img/transparent.png')}*/}
              {/*bgcolor="#fff"*/}
              {/*text="Clear Filters"*/}
              {/*alignSelf="center"*/}
              {/*font="Source Sans Pro 200"*/}
              {/*textColor="#8b8b8b"*/}
              {/*fontSize={15}*/}
              {/*onPress={this.onClearFiltersPress}*/}
            {/*/>*/}
            {/*<Button*/}
              {/*bgimage={require('../../img/red-gradient.png')}*/}
              {/*text="Filter"*/}
              {/*alignSelf="stretch"*/}
              {/*textColor="#fff"*/}
              {/*fontSize={15}*/}
              {/*fontFamily="Source Sans Pro 700"*/}
              {/*onPress={this.onFilterPress}*/}
            {/*/>*/}
          {/*</View>*/}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  amenities: state.getIn(['filter', 'amenities']).toJS(),
  selectedFilters: state.getIn(['filter', 'amenities']).toJS().filter(a => a.selected === true),
  stagedFilters: state.getIn(['filter', 'amenities']).toJS().reduce((a, e, i) => {
    if (e.staged === 'add') a.push(i);
    return a;
  }, []),
  stagedFiltersRemove: state.getIn(['filter', 'amenities']).toJS().reduce((a, e, i) => {
    if (e.staged === 'remove') a.push(i);
    return a;
  }, []),
  coords: state.getIn(['map', 'new_coords']),
});


export default connect(mapStateToProps)(FilterList);
