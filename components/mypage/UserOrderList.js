import { GET_DATA } from '@apis/defaultApi';
import UserOrder from '@components/mypage/UserOrder';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function OrderList({ headers }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET_DATA(`/order`, '', headers).then((res) => {
      if (res) {
        setOrderList(res);
      }
    });
  }, []);

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
