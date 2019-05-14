import {createSelector} from 'reselect';
import {mapToArray, getPercent} from './../components/utils';
import {dataValues} from './../components/constants';

const filtersGetter = (state) => state.filters;
const citiesGetter = (state) => state.cities.entities;
const usersGetter = (state) => state.users.entities;
const idGetter = (state, props) => props.id;


export const cityDataSelectorFactory = () => createSelector(citiesGetter, filtersGetter, idGetter, usersGetter, (cities, filters, id, users) => {
  const {nameFilter} = filters;

  const city = cities.get(+id);
  const userIds = city.users;
  const usersAll = userIds.map(id => users.get(+id));
  const usersArr = usersAll
                    .filter(user => {
                      if (nameFilter === '') return true;
                      return user.name.toUpperCase().indexOf(nameFilter.toUpperCase()) !== -1;
                    })
                    .sort((a, b) => b.percent - a.percent);



  function getValues() {
    const summ = [];

    for (let typeName in dataValues) {
      const type = dataValues[typeName];

      type.forEach(val => {
        summ.push({
          value: getSum({typeName, val}),
          type: typeName,
          status: val,
        })
      })
    }
    return summ;
  }

  function getSum({typeName, val}) {
    return usersAll.reduce((acc, user) => acc + user[typeName][val], 0);
  }
  const summ = getValues();
  const percents = getPercent(summ[2].value, summ[0].value);


  return {
    city,
    users: usersArr,
    summ,
    percents
  };
});



export const filteredCitiesSelector = createSelector(citiesGetter, filtersGetter, (cities, filters) => {
  const {cityFilter} = filters;

  return mapToArray(cities).filter(city => {
    if (!cityFilter) return true;
    return city.id === cityFilter
  });
});