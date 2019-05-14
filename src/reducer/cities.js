import {Actions, Status} from './../components/constants';
import {OrderedMap, Record} from 'immutable';
import {arrayToMap, objToArray} from './../components/utils';


const StateRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
});

const City = Record({
  id: null,
  name: '',
  users: [],
});


export default (CitiesState = new StateRecord(), action) => {
  const {type, data, error} = action;

  switch (type) {

    case Actions.LOAD_DATA + Status.START:
      return CitiesState.set('loading', true);

    case Actions.LOAD_DATA + Status.SUCCESS:
      const {departments: {cities}} = data;

      return CitiesState
        .set('loading', false)
        .set('loaded', true)
        .set('entities', arrayToMap(objToArray(cities), City));

    case Actions.LOAD_DATA + Status.FAIL:
      console.log(`Ошибка ${Actions.LOAD_DATA}: `, error);
      return CitiesState;
  }


  return CitiesState
}