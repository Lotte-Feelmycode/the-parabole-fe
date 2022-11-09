import styled from '@emotion/styled';
import {
  getDateTimeNotKor,
  getState,
  numberToMonetary,
} from '@utils/functions';
import { ORDER_STATE } from '@utils/constants/types';
import Link from 'next/link';

export default function Order({ order }) {
  return (
    <tr>
      <LinkToProduct>
        <Link href={`/product/${order.productId}`}>
          <img src={order.productThumbnailImg} width="100%" margin="0" />
        </Link>
      </LinkToProduct>
      <LinkToProduct>
        <Link href={`/product/${order.productId}`}>{order.productName}</Link>
      </LinkToProduct>
      <Td>{order.productCnt}개</Td>
      <Td>{numberToMonetary(order.productPrice * order.productCnt)}원</Td>
      <Td>{getState(ORDER_STATE, order.state)}</Td>
      <Td>{getDateTimeNotKor(order.updatedAt)}</Td>
    </tr>
  );
}

const LinkToProduct = styled.td`
  padding: 5px;
  &: hover {
    cursor: pointer;
  }
`;

const Td = styled.td`
  padding: 5px;
`;
