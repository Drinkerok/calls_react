import { normalize, schema } from 'normalizr';

function userIdToCity(value) {
  const users = value.users;
  users.map(user => user.id);
  return { ...value};
}


const user = new schema.Entity('users');
const city = new schema.Entity('cities', {users: [user]}, {processStrategy: userIdToCity});
const cityList = [city];


export default (departments) => normalize(departments, cityList).entities;