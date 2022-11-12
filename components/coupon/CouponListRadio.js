import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeGray5 } from '@utils/constants/themeColor';

export default function CouponListRadio({ changeCouponParentId, headers }) {
  const [couponList, setCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  const [radioValue, setRadioValue] = useState(0);

  useEffect(() => {
    if (headers !== '') {
      GET_DATA(`/coupon/seller/list`, '', headers).then((res) => {
        if (res) {
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
    }
  }, [headers]);

  function handleRadioChange(coupon) {
    console.log('handleRadioChange', coupon, coupon.couponId);
    changeCouponParentId(coupon);
    setRadioValue(coupon.couponId);
  }

  function ShowCoupon() {
    if (couponList.length > 0) {
      return (
        couponList &&
        couponList.map((coupon) => (
          <tr
            key={coupon.couponId}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <input
                id={coupon.couponId}
                type="radio"
                name="list-radio"
                value={coupon.couponId}
                checked={radioValue === coupon.couponId}
                onChange={() => {
                  handleRadioChange(coupon);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 mr-3"
              />
              {coupon.name}
            </th>
            <td className="py-4 px-6">
              {coupon.type === 0 ? '정액(₩)' : '정률(%)'}
            </td>
            <td className="py-4 px-6">{coupon.discountValue}</td>
            <td className="py-4 px-6">{coupon.detail}</td>
            <td className="py-4 px-6">{coupon.cnt}</td>
            <td className="py-4 px-6">{coupon.remains}</td>
          </tr>
        ))
      );
    } else {
      return (
        <tr>
          <EmptyTd colSpan={6}>
            <span>{'쿠폰을 생성해주세요'}</span>
          </EmptyTd>
        </tr>
      );
    }
  }

  return (
    <div>
      <CouponTableSection className="overflow-x-auto relative">
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
                쿠폰 상세설명
              </th>
              <th scope="col" className="py-3 px-6">
                발급 수량(총 수량)
              </th>
              <th scope="col" className="py-3 px-6">
                잔여 수량
              </th>
            </tr>
          </thead>
          <tbody>
            <ShowCoupon />
          </tbody>
        </table>
      </CouponTableSection>
      <ResultSection>
        <p>보유 쿠폰 종류 : {totalElementCnt} 개</p>
      </ResultSection>
    </div>
  );
}

const CouponTableSection = styled.div`
  max-height: 400px;
  overflow: auto;
`;

const EmptyTd = styled.td`
  text-align: center;
  font-size: larger;
  font-style: bold;
  padding: 30px;
  background-color: ${ThemeGray5};
  color: black;
`;

const ResultSection = styled.div`
  margin-top: 10px;
  text-align: right;
`;
