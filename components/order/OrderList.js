import { GET } from '@apis/defaultApi';
import Order from '@components/order/Order';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function OrderList({ sellerId }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET(`/orderinfo/seller`, { sellerId }).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, []);

  return (
    <ul className="order-list">
      {orderList &&
        orderList.map((order) => (
          <Li key={order.id}>
            <Order order={order} />
          </Li>
        ))}
    </ul>
  );
}

const Li = styled.li`
  margin-bottom: 30px;
`;
