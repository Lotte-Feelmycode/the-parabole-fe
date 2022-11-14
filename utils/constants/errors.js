export const USER_ERROR = Object.freeze({
  NO_EMAIL: '이메일을 입력해 주세요.',
  INVALID_EMAIL: '잘못된 이메일 형식입니다.',
});

export const EVENT_ERROR = Object.freeze({
  NO_EVENT_TYPE: '이벤트 타입을 선택해주세요.',
  NO_START_AT: '이벤트 시작일시를 입력해주세요.',
  NO_END_AT: '이벤트 종료일시를 입력해주세요.',
  INVALID_DATE: '이벤트 시작 및 종료일시를 확인해주세요',
  NO_EVENT_TITLE: '이벤트 제목을 입력해주세요.',
  NO_DESCRIPT: '이벤트 설명을 입력해주세요.',
  NO_EVENT_IMAGE: '이벤트의 이미지를 등록해주세요',
  NO_EVENT_BANNER_IMAGE: '이벤트 배너이미지를 등록해주세요.',
  NO_EVENT_DETAIL_IMAGE: '이벤트 상세이미지를 등록해주세요.',
  NO_PRIZE_LIST:
    '선택된 경품이 없습니다. 상품 또는 쿠폰을 하나 이상 선택해주세요.',
  NO_IMAGE: '이미지를 등록해주세요.',
});

export const DEV_ERROR = Object.freeze({
  INVALID_ARGS: '유효하지 않은 Argument입니다.',
});

export const COUPON_ENROLL_ERROR = Object.freeze({
  NO_COUPON_NAME: '쿠폰명을 입력해주세요.',
  NO_COUPON_TYPE: '쿠폰 종류를 선택해주세요.',
  NO_DISCOUNT_VALUE: '쿠폰 할인액/할인율을 입력해주세요.',
  INVALID_DATE: '쿠폰 유효 시작 및 만료일시를 확인해주세요',
  NO_VALID_AT: '쿠폰 유효 시작일을 입력해주세요.',
  NO_EXPIRES_AT: '쿠폰 만료일을 입력해주세요.',
  NO_COUPON_DETAILS: '쿠폰 상세 정보를 입력해주세요',
  NO_COUPON_CNT: '발급할 쿠폰 수량을 입력해주세요.',
});

export const AUTH_ERROR = Object.freeze({
  NO_EMAIL: '이메일을 입력해주세요.',
  INADEQUATE_EMAIL: '이메일 형식이 올바르지 않습니다.',
  NO_PASSWORD: '비밀번호를 입력해주세요.',
  INADEQUATE_PASSWORD:
    '영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요.',

  NO_DISCOUNT_VALUE: '쿠폰 할인액/할인율을 입력해주세요.',
  INVALID_DATE: '쿠폰 유효 시작 및 만료일시를 확인해주세요',
  NO_VALID_AT: '쿠폰 유효 시작일을 입력해주세요.',
  NO_EXPIRES_AT: '쿠폰 만료일을 입력해주세요.',
  NO_COUPON_DETAILS: '쿠폰 상세 정보를 입력해주세요',
  NO_COUPON_CNT: '발급할 쿠폰 수량을 입력해주세요.',
});
