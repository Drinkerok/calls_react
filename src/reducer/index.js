import {combineReducers} from 'redux';
import cities from './cities';
import filters from './filters';
import users from './users';
import modal from './modal';


export default combineReducers({
  cities,
  filters,
  users,
  modal,
});