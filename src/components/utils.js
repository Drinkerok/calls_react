import {Map, OrderedMap} from 'immutable';



const PERCENTS = {
  danger: 10,
  warning: 5
}

const mapPercentsToColor = {
  bad: '#d66868',
  normal: '#f2e893',
  good: '#92c191'
}



export function arrayToMap(arr, DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}))
}


export function mapToArray(map) {
  return map.valueSeq().toArray();
}


export function objToArray(obj) {
  const arr = [];

  for (let key in obj) {
    arr.push(obj[key]);
  }

  return arr;
}


export function getPercent(a, b) {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}


export function percentsToColor(percents) {
  return percents > PERCENTS.danger ? mapPercentsToColor['bad'] : percents < PERCENTS.warning ? mapPercentsToColor['good'] : mapPercentsToColor['normal'];
}