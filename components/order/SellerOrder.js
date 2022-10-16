import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Selectbox from '@components/input/SelectBox';
import { getState } from '@utils/functions';

export default function Order({ order }) {
  const router = useRouter();

  return (
    <tr>
      <Td>
        <img src={order.productThumbnailImg} />
      </Td>
      <Td>{order.userEmail}</Td>
      <Td>{order.productName}</Td>
      <Td>{order.productDiscountPrice}</Td>
      <Td>{order.productPrice}</Td>
      <Td>{order.productCnt}</Td>
      <Td>{order.productRemain}</Td>
      <Td>
        <Selectbox props={ORDER_STATE} defaultValue={order.state} />
      </Td>
      <Td>{getState(ORDER_STATE, order.payState)}</Td>
      <Td></Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
  font-family: 'SansLight';
`;
