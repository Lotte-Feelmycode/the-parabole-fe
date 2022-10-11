import { GET } from '@apis/defaultApi';
import Order from '@components/order/Order';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function OrderList({ sellerId }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET(`/orderinfo/seller`, { sellerId: sellerId }).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, [sellerId]);

  return (
    <>
      <table>
        <thead>
          <Th>이미지</Th>
          <Th>유저이메일</Th>
          <Th>주문상품</Th>
          <Th>할인가격</Th>
          <Th>가격</Th>
          <Th>주문수량</Th>
          <Th>재고</Th>
          <Th>주문 상태</Th>
          <Th>결제 수단</Th>
        </thead>
        <tbody>
          {orderList && orderList.map((order) => <Order order={order} />)}
        </tbody>
      </table>
    </>
  );
}

const Th = styled.th`
  background-color: #5252521f;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  font-family: 'SansMedium';
`;
