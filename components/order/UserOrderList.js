import { GET_DATA } from '@apis/defaultApi';
import UserOrder from '@components/order/UserOrder';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

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
            <td scope="col" className="py-1">
              이미지
            </td>
            <td scope="col" className="py-1">
              주문상품
            </td>
            <td scope="col" className="py-1">
              할인가격
            </td>
            <td scope="col" className="py-1">
              가격
            </td>
            <td scope="col" className="py-1">
              주문수량
            </td>
            <td scope="col" className="py-1">
              주문 상태
            </td>
            <td scope="col" className="py-1">
              결제 수단
            </td>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((order) => (
              <UserOrder order={order} key={'order' + order.id} />
            ))}
        </tbody>
      </table>
    </>
  );
}

const Li = styled.li`
  margin-bottom: 30px;
`;
