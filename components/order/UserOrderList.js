import { GET } from '@apis/defaultApi';
import Order from '@components/order/Order';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function OrderList({ userId }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET(`/orderinfo`, { userId }).then((res) => {
      console.log(res);
      if (res) {
        setOrderList(res);
      }
    });
  }, [userId]);

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
