import { ORDER_PAY_STATE, ORDER_STATE } from './constants/types';

function getTime(str) {
  const getDate = str.split('T')[0];
  const date =
    str.split('T')[0].split('-')[0] +
    '년 ' +
    getDate.split('-')[1] +
    '월 ' +
    getDate.split('-')[2] +
    '일 ';

  const getTime = str.split('T')[1];
  let time = getTime.split(':')[0];
  if (time >= 13) time = '오후 ' + (time - 12) + '시 ';
  else time = '오전 ' + time + '시 ';
  time += getTime.split(':')[1] + '분 ';

  return date + time;
}

function getPayState(prop) {
  const payState = ORDER_PAY_STATE.map((state) => {
    if (state.key === prop) return state.name;
  });
  return payState;
}

function getOrderState(prop) {
  const orderState = ORDER_STATE.map((state) => {
    if (state.value === prop) return state.name;
  });
  return orderState;
}

export { getTime, getPayState, getOrderState };
