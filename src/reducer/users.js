import {Actions, Status} from './../components/constants';
import {OrderedMap, Record} from 'immutable';
import {arrayToMap, objToArray, getPercent} from './../components/utils';


const StateRecord = Record({
  entities: new OrderedMap({}),
  loaded: false,
});

const User = Record({
  id: null,
  name: '',
  incoming: {},
  outgoing: {},
  percent: 0,
});


export default (UsersState = new StateRecord(), action) => {
  const {type, data} = action;

  switch (type) {
    case Actions.LOAD_DATA + Status.SUCCESS:
      const {departments: {users}} = data;

      const usersArr = objToArray(users).map(user => {
        const userClone = {...user};
        userClone.incoming.summ = user.incoming.success + user.incoming.fail;
        userClone.percent = getPercent(user.incoming.not_waste, user.incoming.summ);

        return userClone;
      });

      return UsersState
            .set('entities', arrayToMap(usersArr, User))
            .set('loaded', true);
  }


  return UsersState
}