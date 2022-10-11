import { GET_DATA } from '@apis/defaultApi';
import UserCoupon from '@components/coupon/UserCoupon';
import { useEffect, useState } from 'react';

export default function UserCouponList({ userId }) {
  const [userCouponList, setUserCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  useEffect(() => {
    GET_DATA(`/coupon/user/list`, { userId }).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('보유한 쿠폰이 없습니다.');
        } else if (res.content) {
          setUserCouponList(res.content);
          setTotalElementCnt(res.numberOfElements);
        }
      } else {
        alert('사용자의 쿠폰을 조회하지 못했습니다. 다시 시도해주세요.');
      }
    });
  }, []);

  return (
    <div>
      <ul>
        <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  쿠폰명
                </th>
                <th scope="col" class="py-3 px-6">
                  SerialNo
                </th>
                <th scope="col" class="py-3 px-6">
                  판매자 이름
                </th>
                <th scope="col" class="py-3 px-6">
                  쿠폰 타입
                </th>
                <th scope="col" class="py-3 px-6">
                  할인율/할인액
                </th>
                <th scope="col" class="py-3 px-6">
                  사용 여부
                </th>
                <th scope="col" class="py-3 px-6">
                  사용 일자
                </th>
                <th scope="col" class="py-3 px-6">
                  획득 일자
                </th>
                <th scope="col" class="py-3 px-6">
                  유효 시작일
                </th>
                <th scope="col" class="py-3 px-6">
                  쿠폰 만료일
                </th>
                <th scope="col" class="py-3 px-6">
                  최대할인금액
                </th>
                <th scope="col" class="py-3 px-6">
                  최소결제금액
                </th>
              </tr>
            </thead>
            {userCouponList &&
              userCouponList.map((userCoupon) => (
                <li key={userCoupon.serialNo}>
                  <UserCoupon userCoupon={userCoupon} />
                </li>
              ))}
          </table>
        </div>
      </ul>
      <br />
      <strong>
        <p>총 쿠폰 갯수 : {totalElementCnt}</p>
      </strong>
    </div>
  );
}
