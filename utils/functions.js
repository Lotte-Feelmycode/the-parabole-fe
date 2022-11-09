export var isLoggedIn = function () {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
};

export var getLoggedInInfo = function () {
  if (checkLoggedIn) {
    var arr;
    arr.push(localStorage.getItem('token'));
    arr.push(localStorage.getItem('email'));
    arr.push(localStorage.getItem('id'));
    arr.push(localStorage.getItem('name'));
    arr.push(localStorage.getItem('nickname'));
    arr.push(localStorage.getItem('phone'));
    return arr;
  }
};

/**
 * 일시 데이터를 '0000년 00월 00일 오후/오전 00시 00분'으로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getDateTime(str) {
  if (str) {
    const getDateData = str.split('T')[0];
    const date =
      getDateData.split('-')[0] +
      '년 ' +
      getDateData.split('-')[1] +
      '월 ' +
      getDateData.split('-')[2] +
      '일 ';

    const getTime = str.split('T')[1];
    let time = getTime.split(':')[0];
    if (time >= 13) time = '오후 ' + (time - 12) + '시 ';
    else time = '오전 ' + time + '시 ';
    time += getTime.split(':')[1] + '분 ';

    return date + time;
  }
  return str;
}

/**
 * 일시 데이터를 '00-00-00 00:00'으로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getDateTimeShort(str) {
  if (str && str.split('T')[1]) {
    const getDate = str.split('T')[0];
    const getTime = str.split('T')[1];
    var date = getDate;
    var time = getTime;
    if (date.length >= 6) {
      date = date.substr(2);
    }

    if (getTime && getTime.split(':')[1]) {
      time = getTime.split(':')[0] + ':' + getTime.split(':')[1];
    }

    return date + ' ' + time;
  }
  return str;
}

/**
 * 일시 데이터를 '0000년 00월 00일'로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getDate(str) {
  if (str) {
    const getDateData = str.split('T')[0];
    return (
      getDateData.split('-')[0] +
      '년 ' +
      getDateData.split('-')[1] +
      '월 ' +
      getDateData.split('-')[2] +
      '일 '
    );
  }
  return str;
}

/**
 * 일시 데이터를 '0000-00-00'로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getDateShort(str) {
  if (str) {
    return str.split('T')[0];
  }
  return str;
}

/**
 * 일시 데이터를 '0000-00-00 00:00:00'으로 리턴하는 함수
 * @param {*} str
 * @returns
 */
export function getDateTimeNotKor(str) {
  if (str) {
    return str.split('T')[0] + ' ' + str.split('T')[1];
  }
  return str;
}

/**
 * 일시 데이터를 자바스크립트 Date 객체로 리턴하는 함수
 * @param {*} str
 * @returns
 */
 export function getNewDate(str) {
  if (!isEmpty(str)) {
    const getDate = str.split('T')[0];
    const year = getDate.split('-')[0];

    const monthStr =  getDate.split('-')[1];
    const month = monthStr > 9 ? monthStr - 1 : monthStr.substr(1,1) - 1;

    const dayStr = getDate.split('-')[2];
    const day = dayStr > 9 ? dayStr : dayStr.substr(1,1);
    
    const getTime = str.split('T')[1];
    let time = getTime.split(':')[0];
    return new Date(year, month, day, time);
  }
  return str;
}


 * 현재 날짜를 '0000-00-00'으로 리턴하는 함수
 * @returns
 */
export function getTodayDateShort() {
  let date = new Date();
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
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
  return resultState || prop;
}

/**
 * null값 체크
 * @param {*} value
 * @returns
 */
export var isEmpty = function (value) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 숫자를 3자리씩 분리하여 ','를 붙여주는 함수
 * @param {*} value
 * @returns
 */
export function numberToMonetary(number) {
  if (!number) return;
  const numCheck = /^[0-9,]/.test(number);
  if (!numCheck && number) return;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
