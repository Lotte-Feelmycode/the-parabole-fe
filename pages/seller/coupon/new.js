import * as btn from '@components/input/Button';
import SiteHead from '@components/common/SiteHead';
import { GET, POST_DATA } from '@apis/defaultApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import SellerLayout from '@components/seller/SellerLayout';
import { useGetToken } from '@hooks/useGetToken';

export default function CouponCreate() {
  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);
  const uidFromStorage = 4;
  const [role, setRole] = useState();
  const [sellerId, setSellerId] = useState();

  const router = useRouter();
  const [name, onChangeName] = useInput('');
  const [userId, onChangeUserId] = useInput(uidFromStorage);
  const [type, onChangeType] = useInput(1);
  const [discountValue, onChangeDiscountValue] = useInput(0);
  const [validAt, onChangeValidAt] = useInput(Date);
  const [validTime, onChangeValidTime] = useInput();
  const [expiresAt, onChangeExpiresAt] = useInput(Date);
  const [expireTime, onChangeExpireTime] = useInput();
  const [maxDiscountAmount, onChangeMaxDiscountAmount] = useInput(0);
  const [minPaymentAmount, onChangeMinPaymentAmount] = useInput(0);
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

    GET(`/user/role`, { userId }, headers).then((res) => {
      if (res.message === 'ROLE_USER') {
        alert('잘못된 접근입니다.');
        router.push('/');
      } else if (res.message === 'ROLE_SELLER') {
        setRole('SELLER');
        setSellerId(res.data);
      } else {
        alert('로그인 후에 사용 가능합니다.');
        router.push('/user/signin');
      }
    });
  }, []);

  function submitFormHandler(e) {
    e.preventDefault();

    const reqBody = {
      name: name,
      userId: userId,
      type: type,
      discountValue: discountValue,
      validAt: validAt + 'T00:00:00',
      expiresAt: expiresAt + 'T23:59:59',
      maxDiscountAmount: maxDiscountAmount,
      minPaymentAmount: minPaymentAmount,
      detail: detail,
      cnt: cnt,
    };

    POST_DATA(`/coupon/create`, reqBody)
      .then((res) => {
        console.log(res);

        // TODO: alert메시지 수정, 등록 완료 후에 redirection 여부도 추후 의견 통일하여 수정
        alert(
          res.type +
            " 유형의 '" +
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

  if (role === 'SELLER') {
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
                <form>
                  <label for="type">쿠폰 유형 </label>
                  <select
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    name="type"
                    id="cars"
                  >
                    <option value="RATE">할인율</option>
                    <option value="AMOUNT">할인 금액</option>
                  </select>
                </form>
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
                    for="maxDiscountAmount"
                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >
                    최대 할인 금액
                  </label>
                  <input
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    type="number"
                    name="maxDiscountAmount"
                    placeHolder="최대 할인 금액을 입력하세요."
                    onChange={onChangeMaxDiscountAmount}
                    required
                  />
                </div>
                <div>
                  <label
                    for="minPaymentAmount"
                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >
                    최소 결제 금액
                  </label>
                  <input
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    type="number"
                    name="minPaymentAmount"
                    placeHolder="최소 결제 금액을 입력하세요."
                    onChange={onChangeMinPaymentAmount}
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
}
