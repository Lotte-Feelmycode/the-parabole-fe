import { GET } from '@apis/defaultApi';
import UserCoupon from '@components/coupon/UserCoupon';
import { useEffect, useState } from 'react';

export default function UserCouponList({ userId }) {
  const [userCouponList, setUserCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  useEffect(() => {
    GET(`/coupon/user/list`, { userId }).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('보유한 쿠폰이 없습니다.');
        } else if (res.content) {
          setUserCouponList(res.content);
          setTotalElementCnt(res.numberOfElements);
        }
      } else {
        alert('쿠폰을 조회하지 못했습니다. 다시 시도해주세요.');
      }
    });
  }, []);

  return (
    <div>
      <ul>
        {userCouponList &&
          userCouponList.map((userCoupon) => (
            <li key={userCoupon.serialNo}>
              <UserCoupon userCoupon={userCoupon} />
            </li>
          ))}
      </ul>
      <strong>
        <p>총 쿠폰 갯수 : {totalElementCnt}</p>
      </strong>
    </div>
  );
}
