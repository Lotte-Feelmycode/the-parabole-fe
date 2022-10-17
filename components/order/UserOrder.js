import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { getState } from '@utils/functions';
import { ORDER_PAY_STATE, ORDER_STATE } from '@utils/constants/types';

export default function Order({ order }) {
  const router = useRouter();

  return (
    <tr>
      <Td>
        <img src={order.productThumbnailImg} />
      </Td>
      <Td>{order.productName}</Td>
      <Td>{order.productDiscountPrice}</Td>
      <Td>{order.productPrice}</Td>
      <Td>{order.productCnt}</Td>
      <Td>{order.productRemain}</Td>
      <Td>{getState(ORDER_STATE, order.state)}</Td>
      <Td>{getState(ORDER_PAY_STATE, order.payState)}</Td>
      <Td></Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
