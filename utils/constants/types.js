export const APPLY_TYPE = [
  { value: 'EVENT_TOTAL', name: '전체 이벤트', index: 3 },
  { value: 'EVENT_END', name: '종료된 이벤트', index: 2 },
  { value: 'EVENT_PROCEEDING', name: '진행중인 이벤트', index: 1 },
  { value: 'EVENT_BEGIN', name: '시작전 이벤트', index: 0 },
];

export const EVENT_TYPE = [
  {
    value: 'FCFS',
    name: '선착순',
  },
  {
    value: 'RAFFLE',
    name: '추첨',
  },
];

export const EVENT_STATUS = [
  {
    value: 0,
    name: '진행 전',
  },
  {
    value: 1,
    name: '진행 중',
  },
  {
    value: 2,
    name: '종료',
  },
];

export const PRIZE_TYPE = [
  { value: 'PRODUCT', name: '상품' },
  { value: 'COUPON', name: '쿠폰' },
];
export const ORDER_STATE = [
  { value: 'BEFORE_ORDER', name: '입금전' },
  { value: 'PAY_COMPLETE', name: '결제완료' },
  { value: 'BEFORE_DELIVERY', name: '배송준비' },
  { value: 'DELIVERY', name: '배송중' },
  { value: 'DELIVERY_COMPLETE', name: '배송완료' },
  { value: 'ORDER_CANCEL', name: '취소' },
  { value: 'REFUND', name: '반품' },
];

export const ORDER_PAY = [
  { value: 'CARD', name: '카드결제', index: 1 },
  { value: 'BANK_TRANSFER', name: '실시간 계좌이체', index: 2 },
  { value: 'PHONE', name: '휴대폰결제', index: 3 },
  { value: 'VIRTUAL_ACCOUNT', name: '가상계좌', index: 4 },
  { value: 'KAKAO_PAY', name: '카카오페이', index: 5 },
  { value: 'TOSS', name: '토스', index: 6 },
  { value: 'WITHOUT_BANK', name: '무통장입금(결제 전)', index: 7 },
  { value: 'NAVER_PAY', name: '네이버페이', index: 8 },
];

export const ORDER_PAY_STATE = [
  { value: 'CARD', name: '카드결제' },
  { value: 'BANK_TRANSFER', name: '실시간 계좌이체' },
  { value: 'PHONE', name: '휴대폰결제' },
  { value: 'VIRTUAL_ACCOUNT', name: '가상계좌' },
  { value: 'KAKAO_PAY', name: '카카오페이' },
  { value: 'TOSS', name: '토스' },
  { value: 'WITHOUT_BANK', name: '무통장입금' },
  { value: 'NAVER_PAY', name: '네이버페이' },
];

export const CHAT_STATE = [
  { value: 'EVENT', name: '이벤트' },
  { value: 'QNA', name: '1:1문의' },
];
