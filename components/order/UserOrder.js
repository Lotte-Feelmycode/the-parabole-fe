import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { getPayState, getOrderState } from '@utils/functions';

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
      <Td>{getOrderState(order.state)}</Td>
      <Td>{getPayState(order.payState)}</Td>
      <Td></Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
