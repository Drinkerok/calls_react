import {Status} from './../components/constants';
import normalizeDepartments from './../jsonNormalizr';


export default (store) => (next) => (action) => {
  const {callAPI, type, ...rest} = action;

  if (!callAPI) return next(action);

  next({
    ...rest,
    type: type + Status.START
  })

  setTimeout(() => {
    fetch(callAPI)
      .then((response) => response.json())
      .then((data) => {
        const response = data.response;
        const settings = response.settings
        const departments = response.departments;

        const normalizedDepartments = normalizeDepartments(departments);

        return next({
          ...rest,
          type: type + Status.SUCCESS,
          data: {...normalizedDepartments, settings}
        })
      })
      .catch((error) => next({
        ...rest,
        type: type + Status.FAIL,
        error
      }))
    }, 1000);
}