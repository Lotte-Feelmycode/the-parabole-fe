/**
 * 일시 데이터를 '00년 00월 00일 오후/오전 00시 00분'으로 리턴하는 함수
 * @param {*} str
 * @returns
 */
function getTime(str) {
  if (str) {
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
}

/**
 * 딕셔너리 객체 입력시 name 리턴하는 함수
 * @param {*} state
 * @param {*} prop
 * @returns
 */
export function getState(state, prop) {
  const resultState = state.map((state) => {
    if (state.value === prop) return state.name;
  });
  return resultState;
}

/**
 * 주문 금액 총합 리턴하는 함수
 * @param {*} orders
 * @returns
 */
export function getOrderTotal(orders) {
  if (!orders) return;
  let total = 0;
  orders.map((order) => {
    total += order.productPrice;
  });
  return total;
}

/**
 * 일시 데이터를 '00-00-00 00:00:00'으로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getTimeNotKor(str) {
  if (str) {
    return str.split('T')[0] + ' ' + str.split('T')[1];
  }
}

/**
 * null값 체크
 * @param {*} value
 * @returns
 */
export var isEmpty = function (value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
