export default function getTime(str) {
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
