import { CacheProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

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
      <Td>{order.state}</Td>
      <Td>{order.payState}</Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 30px;
`;
