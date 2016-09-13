import {Map} from 'immutable';
import {setLocations, setNavigatorProps, updateAnnotations} from '../src/core';



export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
    case 'SET_NAVIGATOR_PROPS':
        return setNavigatorProps(state, action.state);
    case 'UPDATE_ANNOTATIONS':
      return updateAnnotations(state, action.state);
  }
  return state;
}

