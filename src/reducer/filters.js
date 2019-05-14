import {Actions} from './../components/constants';
import {Record} from 'immutable';


const StateRecord = Record({
  nameFilter: '',
  dateFilter: {
    from: undefined,
    to: undefined,
  },
  cityFilter: null,
});


export default (FiltersState = new StateRecord(), action) => {
  const {type, payload} = action;

  switch (type) {
    case Actions.CHANGE_NAME:
      return FiltersState.set('nameFilter', payload.name)

    case Actions.SELECT_CITY:
      const cityName = payload.selected ? payload.selected.value : null;
      return FiltersState.set('cityFilter', cityName);

    case Actions.CHANGE_DATE_RANGE:
      return FiltersState.set('dateFilter', payload.range);
  }


  return FiltersState
}