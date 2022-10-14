import { GET_DATA } from '@apis/defaultApi';
import Coupon from '@components/coupon/Coupon';
import * as btn from '@components/input/Button';
import { MainColor1 } from '@utils/constants/themeColor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CouponList({ sellerId }) {
  const router = useRouter();
  const [couponList, setCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  useEffect(() => {
    GET_DATA(`/coupon/seller/list`, { sellerId }).then((res) => {
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
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                쿠폰명
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 타입
              </th>
              <th scope="col" className="py-3 px-6">
                할인율/액수
              </th>
              <th scope="col" className="py-3 px-6">
                생성 일자
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 유효 시작일시
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 만료일시
              </th>
              <th scope="col" className="py-3 px-6">
                최대할인금액
              </th>
              <th scope="col" className="py-3 px-6">
                최소결제금액
              </th>
              <th scope="col" className="py-3 px-6">
                쿠폰 상세설명
              </th>
              <th scope="col" className="py-3 px-6">
                발급 수량(총 수량)
              </th>
              {/* <th scope="col" class="py-3 px-6">
                잔여 수량
              </th> */}
            </tr>
          </thead>
          <tbody>
            {couponList &&
              couponList.map((coupon) => <Coupon coupon={coupon} />)}
          </tbody>
        </table>
      </div>
      <br />
      <strong>
        <p>총 쿠폰 수량 : {totalElementCnt}</p>
      </strong>
      <btn.Blue
        id="createbtn"
        onClickFunc={() => router.push('./create')}
        buttonText="쿠폰 등록하기"
        backgroundColor={MainColor1}
      />
    </div>
  );
}
