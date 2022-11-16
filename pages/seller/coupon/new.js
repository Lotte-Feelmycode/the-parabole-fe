import * as btn from '@components/input/Button';
import SiteHead from '@components/common/SiteHead';
import { GET, POST_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import SellerLayout from '@components/seller/SellerLayout';
import { useGetToken } from '@hooks/useGetToken';
import { useCallback } from 'react';
import Radio from '@components/input/Radio';
import { COUPON_TYPE } from '@utils/constants/types';
import { isEmpty } from '@utils/functions';
import { COUPON_ENROLL_ERROR } from '@utils/constants/errors';

export default function CouponCreate() {
  const router = useRouter();
  const [name, onChangeName] = useInput('');
  const [discountValue, onChangeDiscountValue] = useInput();
  const [validAt, onChangeValidAt] = useInput(Date);
  const [expiresAt, onChangeExpiresAt] = useInput(Date);
  const [coupontype, setCoupontype] = useState();

  const typeHandler = (e) => {
    setCoupontype(e.target.value);
  };

  function validateValidDate(initialValue = null) {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
      if (expiresAt !== null && e < expiresAt) {
        setValue(e.target.value);
      } else {
        alert('쿠폰 유효 시작일은 만료일 이전이어야 합니다.');
      }
    }, []);
    return [value, handler, setValue];
  }

  function validateExpireDate(initialValue = null) {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
      if (validAt !== null && e > validAt) {
        setValue(e.target.value);
      } else {
        alert('쿠폰 만료일은 유효 시작일 이후이어야 합니다.');
      }
    }, []);
    return [value, handler, setValue];
  }

  // 쿠폰 등록 validation check
  function validation(inputParams) {
    if (isEmpty(inputParams.name)) {
      alert(COUPON_ENROLL_ERROR.NO_COUPON_NAME);
      return false;
    }
    if (isEmpty(inputParams.type)) {
      alert(COUPON_ENROLL_ERROR.NO_COUPON_TYPE);
      return false;
    }
    if (isEmpty(inputParams.discountValue)) {
      alert(COUPON_ENROLL_ERROR.NO_DISCOUNT_VALUE);
      return false;
    }
    if (isEmpty(inputParams.validAt)) {
      alert(COUPON_ENROLL_ERROR.NO_VALID_AT);
      return false;
    }
    if (isEmpty(inputParams.expiresAt)) {
      alert(COUPON_ENROLL_ERROR.NO_EXPIRES_AT);
      return false;
    }
    if (isEmpty(inputParams.detail)) {
      alert(COUPON_ENROLL_ERROR.NO_COUPON_DETAILS);
      return false;
    }
    if (isEmpty(inputParams.cnt)) {
      alert(COUPON_ENROLL_ERROR.NO_COUPON_CNT);
      return false;
    }
    if (
      inputParams.validAt >= inputParams.expiresAt ||
      inputParams.validAt <= new Date() ||
      inputParams.expiresAt <= new Date()
    ) {
      alert(COUPON_ENROLL_ERROR.INVALID_DATE);
      return false;
    }
    return true;
  }

  const [detail, onChangeDetail] = useInput('');
  const [cnt, onChangeCnt] = useInput();

  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push('/signin');
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push('/');
      }
    }
    setHeaders(useGetToken());
  }, []);

  function submitFormHandler(e) {
    e.preventDefault();

    const reqBody = {
      name: name,
      type: coupontype,
      discountValue: discountValue,
      validAt: validAt + 'T00:00:00',
      expiresAt: expiresAt + 'T23:59:59',
      detail: detail,
      cnt: cnt,
    };

    if (validation(reqBody)) {
      POST_DATA(`/coupon/new`, reqBody, headers)
        .then((res) => {
          alert(
            res.couponName +
              "' 쿠폰이 \n" +
              res.cnt +
              ' 장 발급 완료 되었습니다.',
          );
          router.push(`./list`);
        })
        .catch(function (error) {
          console.log(error);
          return {};
        });
    }
  }

  return (
    <SellerLayout>
      <SiteHead title="쿠폰 등록" />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
            쿠폰 등록
          </h2>
          <form className="max-w-lg border rounded-lg mx-auto" method="post">
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  for="name"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰명
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  name="name"
                  placeHolder="쿠폰명을 입력하세요."
                  onChange={onChangeName}
                  required
                />
              </div>
              <label for="type">쿠폰 유형 </label>

              <div>
                <Radio
                  id="couponType"
                  items={COUPON_TYPE}
                  onChange={typeHandler}
                  value={coupontype}
                />
              </div>
              <div>
                <label
                  for="discountValue"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰 할인율/금액
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="number"
                  name="discountValue"
                  placeHolder="할인율/금액을 입력하세요."
                  onChange={onChangeDiscountValue}
                  required
                />
              </div>
              <div>
                <label
                  for="validAt"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰 유효 시작일
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="date"
                  name="validAt"
                  placeHolder="유효 시작일을 입력하세요."
                  onChange={onChangeValidAt}
                  required
                />
              </div>
              <div>
                <label
                  for="expiresAt"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰 만료일
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="date"
                  name="expiresAt"
                  placeHolder="만료일을 입력하세요."
                  onChange={onChangeExpiresAt}
                  required
                />
              </div>
              <div>
                <label
                  for="detail"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰 상세 설명
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="text"
                  name="detail"
                  placeHolder="쿠폰 상세 설명을 입력하세요."
                  onChange={onChangeDetail}
                  required
                />
              </div>
              <div>
                <label
                  for="cnt"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  쿠폰 발행 수량
                </label>
                <input
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="number"
                  name="cnt"
                  placeHolder="쿠폰 상세 설명을 입력하세요."
                  onChange={onChangeCnt}
                  required
                />
              </div>
              <div />
              <btn.Pink
                buttonText="쿠폰 등록하기"
                onClickFunc={submitFormHandler}
              />
            </div>
          </form>
        </div>
      </div>
    </SellerLayout>
  );
}
