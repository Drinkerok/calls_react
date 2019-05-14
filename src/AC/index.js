import {Actions, Status, API, DATE_OPTIONS} from './../components/constants';
import normalizeDepartments from './../jsonNormalizr';


const LOAD_DATA_PERIOD = 500;


function getURLwithParameters(params = {}, url) {
  let paramsString = ``;
  for (let key in params) {
    const value = params[key];

    if (value === null) continue;

    paramsString = `${paramsString}&${key}=${value}`;
  }
  paramsString = paramsString === `` ? `` : `?${paramsString.slice(1)}`;

  return `${url}${paramsString}`;
}


export const loadData = () => {
  return (dispatch, getState) => {
    setInterval(async () => {
      try {
        const {
          filters: {
            dateFilter: {
              from,
              to
            }
          },
          cities
        } = getState();

        if (cities.loading) return;

        dispatch({
          type: Actions.LOAD_DATA + Status.START,
        });

        const url = getURLwithParameters({
          min_date: from ? from.toLocaleString("ru", DATE_OPTIONS) : null,
          max_date: to ? to.toLocaleString("ru", DATE_OPTIONS) : null,
        }, API.LOAD_DATA);
        const res = await fetch(url);
        const {response: {settings, departments}} = await res.json();
        const data = {settings, departments: normalizeDepartments(departments)};

        dispatch({
          type: Actions.LOAD_DATA + Status.SUCCESS,
          data: { ...data }
        })
      } catch(error) {
        dispatch({
          type: Actions.LOAD_DATA + Status.FAIL,
          payload: { error }
        });
      }
    }, LOAD_DATA_PERIOD);
  }
};



export function changeName(name) {
  return {
    type: Actions.CHANGE_NAME,
    payload: { name }
  }
}

export function selectCity(selected) {
  return {
    type: Actions.SELECT_CITY,
    payload: { selected }
  }
}

export function changeDate(range) {
  return {
    type: Actions.CHANGE_DATE_RANGE,
    payload: { range }
  }
}



export function openModal(data) {
  return (dispatch, getState) => {
    dispatch({
      type: Actions.OPEN_MODAL,
      payload: {
        ...data,
      }
    });

    const {
      filters: {
        dateFilter: {
          from,
          to
        }
      }
    } = getState();


    const getModalData = async () => {
      try {
        const url = getURLwithParameters({
          id: data.id,
          type: data.type,
          call_type: data.call_type,
          call_status: data.call_status,
          min_date: from ? from.toLocaleString("ru", DATE_OPTIONS) : null,
          max_date: to ? to.toLocaleString("ru", DATE_OPTIONS) : null,
        }, API.LOAD_MODAL);
        const res = await fetch(url);
        const {response} = await res.json();
        
        dispatch({
          type: Actions.OPEN_MODAL + Status.SUCCESS,
          payload: {...data, response}
        });
      } catch(error) {
        dispatch({
          type: Actions.OPEN_MODAL + Status.FAIL,
          payload: {...data, error}
        });
      }
    };
    getModalData();
  }
}


export function closeModal() {
  return {
    type: Actions.CLOSE_MODAL,
  }
}