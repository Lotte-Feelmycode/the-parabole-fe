import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';

export default function Coupon({ coupon }) {
  console.log('USER COUPON props : ' + JSON.stringify(coupon));

  return (
    <div className="coupon">
      <div className="coupon-table">
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {coupon.name}
            </th>
            <td class="py-4 px-6">{coupon.type}</td>
            <td class="py-4 px-6">{coupon.discountRate}</td>
            <td class="py-4 px-6">{coupon.discountAmount}</td>
            <td class="py-4 px-6">{coupon.createdAt}</td>
            <td class="py-4 px-6">{coupon.validAt}</td>
            <td class="py-4 px-6">{coupon.expiresAt}</td>
            <td class="py-4 px-6">{coupon.maxDiscountAmount}</td>
            <td class="py-4 px-6">{coupon.minPaymentAmount}</td>
            <td class="py-4 px-6">{coupon.detail}</td>
            <td class="py-4 px-6">{coupon.cnt}</td>
          </tr>
        </tbody>
      </div>
    </div>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
