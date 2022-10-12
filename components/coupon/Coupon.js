import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';
import getTime from '@utils/functions';

export default function Coupon({ coupon }) {
  console.log('USER COUPON props : ' + JSON.stringify(coupon));

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {coupon.name}
      </th>
      <td className="py-4 px-6">{coupon.type}</td>
      <td className="py-4 px-6">{coupon.discountValue}</td>
      <td className="py-4 px-6">{getTime(coupon.createdAt)}</td>
      <td className="py-4 px-6">{getTime(coupon.validAt)}</td>
      <td className="py-4 px-6">{getTime(coupon.expiresAt)}</td>
      <td className="py-4 px-6">{coupon.maxDiscountAmount}</td>
      <td className="py-4 px-6">{coupon.minPaymentAmount}</td>
      <td className="py-4 px-6">{coupon.detail}</td>
      <td className="py-4 px-6">{coupon.cnt}</td>
    </tr>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
