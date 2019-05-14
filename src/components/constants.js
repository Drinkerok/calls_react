export const THEAD = [
  `Филиал`,
  `ФИО сотрудника ОП`,
  `Количество входящих`,
  `Входящие пропущенные`,
  `Неотработанные пропущенные`,
  `Отработанные пропущенные`,
  `Отработанные пропущенные не вовремя`,
  `Входящие успешные`,
  `Исходящие успешные`
];


export const dataValues = {
  'incoming': ['summ', 'fail', 'not_waste', 'waste_success', 'waste_fail', 'success'],
  'outgoing': ['success']
};


export const API = {
  LOAD_DATA: './src/data.json',
  // LOAD_DATA: '/rest/voximplant/get.stats',
  LOAD_MODAL: './src/modal.json',
  // LOAD_MODAL: '/rest/voximplant/user.stats',
};


export const Actions = {
  LOAD_DATA: `LOAD_DATA`,
  CHANGE_NAME: `CHANGE_NAME`,
  SELECT_CITY: `SELECT_CITY`,
  CHANGE_DATE_RANGE: `CHANGE_DATE_RANGE`,
  OPEN_MODAL: `OPEN_MODAL`,
  CLOSE_MODAL: `CLOSE_MODAL`,
};


export const Status = {
  START: `_START`,
  SUCCESS: `_SUCCESS`,
  FAIL: `_FAIL`,
};


export const DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
};