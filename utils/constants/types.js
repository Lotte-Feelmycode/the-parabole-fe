export const EVENT_TYPE = [
  {
    code: 'FCFS',
    name: '선착순',
  },
  {
    code: 'RAFFLE',
    name: '추첨',
  },
];

export const EVENT_STATUS = [
  {
    code: '0',
    name: '진행 전',
  },
  {
    code: '1',
    name: '진행 중',
  },
  {
    code: '2',
    name: '종료',
  },
];

export const ORDER_STATE = [
  { value: 'BEFORE_PAY', name: '입금전' },
  { value: 'PAY_COMPLETE', name: '결제완료' },
  { value: 'BEFORE_DELIVERY', name: '배송준비' },
  { value: 'DELIVERY', name: '배송중' },
  { value: 'DELIVERY_COMPLETE', name: '배송완료' },
  { value: 'ORDER_CANCEL', name: '취소' },
  { value: 'REFUND', name: '반품' },
];

export const ORDER_PAY = [
  { key: 'CARD', name: '카드결제', index: 1 },
  { key: 'BANK_TRANSFER', name: '실시간 계좌이체', index: 2 },
  { key: 'PHONE', name: '휴대폰결제', index: 3 },
  { key: 'VIRTUAL_ACCOUNT', name: '가상계좌', index: 4 },
  { key: 'KAKAO_PAY', name: '카카오페이', index: 5 },
  { key: 'TOSS', name: '토스', index: 6 },
  { key: 'WITHOUT_BANK', name: '무통장입금(결제 전)', index: 7 },
  { key: 'NAVER_PAY', name: '네이버페이', index: 8 },
];

export const ORDER_PAY_STATE = [
  { key: 'CARD', name: '카드결제' },
  { key: 'BANK_TRANSFER', name: '실시간 계좌이체' },
  { key: 'PHONE', name: '휴대폰결제' },
  { key: 'VIRTUAL_ACCOUNT', name: '가상계좌' },
  { key: 'KAKAO_PAY', name: '카카오페이' },
  { key: 'TOSS', name: '토스' },
  { key: 'WITHOUT_BANK', name: '무통장입금(결제 전)' },
  { key: 'WITHOUT_BANK_PAY', name: '무통장입금(결제완료)' },
  { key: 'NAVER_PAY', name: '네이버페이' },
];
