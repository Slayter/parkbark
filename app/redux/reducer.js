import {Map} from 'immutable';
import {setLocations, updateSearch, updateAnnotations, updateRegion, updateSelectedPark, setParkSurvey, updateParkSurvey, setAmenities, updateFilter, removeFilter} from '../src/core';


export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
    case 'SET_NAVIGATOR_PROPS':
        return setNavigatorProps(state, action.state);
    case 'UPDATE_ANNOTATIONS':
      return updateAnnotations(state, action.state);
    case 'UPDATE_REGION':
      return updateRegion(state, action.state);
    case 'UPDATE_SEARCH':
      return updateSearch(state, action.state);
    case 'UPDATE_SElECTED_PARK':
        return updateSelectedPark(state, action.state);
    case 'SET_PARK_SURVEY':
      return setParkSurvey(state, action.state);
    case 'UPDATE_SURVEY':
      return updateParkSurvey(state, action.state);
    case 'SET_AMENITIES' :
      return setAmenities(state, action.state);
    case 'ADD_FILTER' :
      return updateFilter(state, action.state);
    case 'REMOVE_FILTER' :
        return removeFilter(state, action.state);
  }
  return state;
}
