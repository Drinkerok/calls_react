import {Actions, Status} from './../components/constants';
import {Record} from 'immutable';


const StateRecord = Record({
  openId: null,
  data: {},
  open: false,
  loading: false,
  loaded: false,
});

const mapTypeToName = {
  incoming: 'входящие',
  outgoing: 'исходящие'
};
const mapStatusToName = {
  summ: 'Все',
  fail: 'Пропущенные',
  not_waste: 'Неотработанные пропущенные',
  waste_success: 'Отработанные пропущенные',
  waste_fail: 'Отработанные пропущенные не вовремя',
  success: 'Успешные',
};


function getOpenId(data) {
    return `${data.id}_${data.type}_${data.call_type}_${data.call_status}`
}


export default (ModalState = new StateRecord(), action) => {
  const {type, payload} = action;

  switch (type) {
    case Actions.OPEN_MODAL:
      return ModalState
              .set('openId', getOpenId(payload))
              .set('open', true)
              .set('loading', true);

    case Actions.OPEN_MODAL + Status.SUCCESS:
      const {response, name, call_type, call_status} = payload;
      if (getOpenId(payload) !== ModalState.get('openId')) return ModalState;
      return ModalState
              .set('data', {
                calls: response,
                name,
                header: `${mapTypeToName[call_type]} ${mapStatusToName[call_status]}`
              })
              .set('loading', false)
              .set('loaded', true);

    case Actions.OPEN_MODAL + Status.FAIL:
      if (getOpenId(payload) !== ModalState.get('openId')) return ModalState;
      return ModalState
              .set('loading', false);

    case Actions.CLOSE_MODAL:
      return ModalState
              .set('openId', null)
              .set('data', {})
              .set('open', false)
              .set('loaded', false);
  }

  return ModalState
}