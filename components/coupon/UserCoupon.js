import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';
import getTime from '@utils/functions';

export default function UserCoupon({ userCoupon }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {userCoupon.name}
      </th>
      <td className="py-4 px-6">{userCoupon.serialNo}</td>
      <td className="py-4 px-6">{userCoupon.sellerName}</td>
      <td className="py-4 px-6">{userCoupon.type}</td>
      <td className="py-4 px-6">{userCoupon.RateOrAmount}</td>
      <td className="py-4 px-6">{userCoupon.useState}</td>
      <td className="py-4 px-6">{userCoupon.useDate}</td>
      <td className="py-4 px-6">{getTime(userCoupon.acquiredDate)}</td>
      <td className="py-4 px-6">{getTime(userCoupon.validAt)}</td>
      <td className="py-4 px-6">{getTime(userCoupon.expiresAt)}</td>
      <td className="py-4 px-6">{userCoupon.maxDiscountAmount}</td>
      <td className="py-4 px-6">{userCoupon.minPaymentAmount}</td>
    </tr>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
