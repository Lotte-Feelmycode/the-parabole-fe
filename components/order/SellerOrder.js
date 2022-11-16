import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Selectbox from '@components/input/SelectBox';
import { getState } from '@utils/functions';
import { ORDER_STATE } from '@utils/constants/types';
import { numberToMonetary } from '@utils/functions';
export default function Order({ order }) {
  const router = useRouter();

  return (
    <tr
      key={order.id}
      className="h-24 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="bg-gray-50 py-2 px-4 w-40 text-center">
        {order.productName}
      </td>
      <td className="py-2 px-4 mx-2 w-16">
        <img src={order.productThumbnailImg} alt="상품"></img>
      </td>
      <td className="py-2 px-2 w-20 text-right">
        {numberToMonetary(order.productdiscountPrice)}
      </td>
      <td className="py-2 px-2 w-20 text-right">
        {numberToMonetary(order.productPrice)}
      </td>
      <td className="py-2 px-4 w-12 text-right">
        {numberToMonetary(order.productCnt)}
      </td>
      <td className="py-2 px-4 w-24 text-right">
        {numberToMonetary(order.productCnt * order.productdiscountPrice)}
      </td>
      <td className="py-2 px-4 w-12 text-right">{order.productRemains}</td>
      <td className="py-2 px-4 w-24 text-right">{order.userEmail}</td>
      <td className="py-2 px-4 w-24">
        <Selectbox props={ORDER_STATE} defaultValue={order.state} />
      </td>
      <td className="py-2 px-4 w-24">
        {getState(ORDER_STATE, order.payState)}
      </td>
    </tr>
  );
}
