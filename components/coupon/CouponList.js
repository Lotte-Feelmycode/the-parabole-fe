import { GET } from '@apis/defaultApi';
import Coupon from '@components/coupon/Coupon';
import { useEffect, useState } from 'react';

export default function CouponList({ sellerId }) {
  const [couponList, setCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  useEffect(() => {
    GET(`/coupon/seller/list`, { sellerId }).then((res) => {
      if (res) {
        console.log(res);
        if (res.numberOfElements === 0) {
          alert('판매자가 등록한 쿠폰이 없습니다.');
        } else if (res.content) {
          setCouponList(res.content);
          setTotalElementCnt(res.numberOfElements);
        }
      } else {
        alert('판매자의 쿠폰을 조회하지 못했습니다. 다시 시도해주세요.');
      }
    });
  }, []);

  return (
    <div>
      <ul>
        {couponList &&
          couponList.map((coupon) => (
            <li key={coupon.name}>
              <Coupon coupon={coupon} />
            </li>
          ))}
      </ul>
      <strong>
        <p>총 쿠폰 갯수 : {totalElementCnt}</p>
      </strong>
    </div>
  );
}
