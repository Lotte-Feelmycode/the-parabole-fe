import { GET_DATA } from '@apis/defaultApi';
import { getDate, numberToMonetary } from '@utils/functions';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

// function UserCoupon({ userCoupon }) {
//   return (
//     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//       <th
//         scope="row"
//         className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//       >
//         {userCoupon.name}
//       </th>
//       <td className="py-4 px-6">{userCoupon.serialNo}</td>
//       <td className="py-4 px-6">{userCoupon.sellerName}</td>
//       <td className="py-4 px-6">{userCoupon.type}</td>
//       <td className="py-4 px-6">{userCoupon.RateOrAmount}</td>
//       <td className="py-4 px-6">{userCoupon.useState}</td>
//       <td className="py-4 px-6">{getTime(userCoupon.expiresAt)}</td>
//     </tr>
//   );
// }

function UserCoupon({ userCoupon }) {
  var benefitType = '';
  var benefitAmount = '';

  if (userCoupon.type === 'RATE') {
    benefitType = '할인율';
    benefitAmount = userCoupon.discountValue + '%';
  } else {
    benefitType = '할인금액';
    benefitAmount = numberToMonetary(userCoupon.discountValue) + '원';
  }
  var couponState = '';
  if (userCoupon.useState === 'NOT_USED') {
    couponState = '사용가능';
  } else {
    couponState = '사용불가능';
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {userCoupon.name}
      </th>
      <td className="px-1">{userCoupon.serialNo}</td>
      <td className="px-1">{userCoupon.sellerName}</td>
      <td className="py-1 px-1">
        <BenefitSection>
          <span>{benefitType}</span>
          <span>{benefitAmount}</span>
        </BenefitSection>
      </td>
      <td className="px-1">{getDate(userCoupon.validAt)}</td>
    </tr>
  );
}

export default function UserCouponList({ userId }) {
  const [userCouponList, setUserCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);

  useEffect(() => {
    GET_DATA(`/coupon/list`).then((res) => {
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
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-1">
                쿠폰명
              </th>
              <th scope="col" className="py-3 px-1">
                SerialNo
              </th>
              <th scope="col" className="py-3 px-1">
                판매자 이름
              </th>
              <th scope="col" className="py-3 px-1">
                혜택
              </th>
              <th scope="col" className="py-3 px-6">
                할인율/할인액
              </th>
              <th scope="col" className="py-3 px-6">
                사용 여부
              </th>
              <th scope="col" className="py-3 px-1">
                쿠폰 만료일
              </th>
            </tr>
          </thead>
          <tbody>
            {userCouponList &&
              userCouponList.map((userCoupon) => (
                <UserCoupon key={userCoupon.serialNo} userCoupon={userCoupon} />
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <TotalCouponCountSection>
        <strong>
          <p>총 쿠폰 수량 : {totalElementCnt}</p>
        </strong>
      </TotalCouponCountSection>
    </div>
  );
}

const TotalCouponCountSection = styled.div`
  text-align: right;
`;

const BenefitSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
