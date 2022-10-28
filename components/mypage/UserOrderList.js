import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import { getState, numberToMonetary } from '@utils/functions';
import { ORDER_PAY_STATE, ORDER_STATE } from '@utils/constants/types';

export default function OrderList({ userId }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET_DATA(`/order`, { userId }).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, [userId]);

  return (
    <>
      <table className="w-full text-m text-center">
        <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="h-12">
            <ImageSection scope="col" className="p-1">
              이미지
            </ImageSection>
            <ProductNameSection scope="col" className="p-1">
              주문상품
            </ProductNameSection>
            <td scope="col" className="p-1">
              주문수량
            </td>
            <td scope="col" className="p-1">
              주문 금액
            </td>
            <td scope="col" className="p-1">
              주문 상태
            </td>
            <td scope="col" className="p-1">
              주문 일자
            </td>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((order) => (
              <UserOrder order={order} key={order.id} />
            ))}
        </tbody>
      </table>
    </>
  );
}
const ImageSection = styled.td`
  width: 15%;
`;
const ProductNameSection = styled.td`
  width: 30%;
`;

function UserOrder({ order }) {
  const router = useRouter();

  const goToProduct = (id) => {
    router.push({ pathname: `/product/${id}` });
  };

  return (
    <tr>
      <Td>
        <a
          className="product"
          onClick={() => goToProduct(order.productId || 0)}
        >
          <img src={order.productThumbnailImg} width="100%" margin="0" />
        </a>
      </Td>
      <Td>{order.productName}</Td>
      <Td>{order.productCnt}개</Td>
      <Td>{numberToMonetary(order.productPrice * order.productCnt)}원</Td>
      <Td>{getState(ORDER_STATE, order.state)}</Td>
      <Td>{getState(ORDER_PAY_STATE, order.payState)}</Td>
    </tr>
  );
}

const Td = styled.td`
  padding: 5px;
`;
