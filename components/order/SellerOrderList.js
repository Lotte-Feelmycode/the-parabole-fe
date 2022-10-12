import { GET_DATA } from '@apis/defaultApi';
import Order from '@components/order/Order';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function OrderList({ sellerId }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET_DATA(`/orderinfo/seller`, { sellerId: sellerId }).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, [sellerId]);

  return (
    <>
      <table>
        <thead>
          <Td>이미지</Td>
          <Td>유저이메일</Td>
          <Td>주문상품</Td>
          <Td>할인가격</Td>
          <Td>가격</Td>
          <Td>주문수량</Td>
          <Td>재고</Td>
          <Td>주문 상태</Td>
          <Td>결제 수단</Td>
        </thead>
        <tbody>
          {orderList && orderList.map((order) => <Order order={order} />)}
        </tbody>
      </table>
    </>
  );
}

const Td = styled.td`
  background-color: #5252521f;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  font-family: 'SansMedium';
`;
