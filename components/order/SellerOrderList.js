import { useEffect, useState } from 'react';
import { GET_DATA } from '@apis/defaultApi';
import Order from '@components/order/SellerOrder';

export default function SellerOrderList({ headers }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    GET_DATA(`/orderinfo/seller`, null, headers).then((res) => {
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
            <td scope="col" className="py-1">
              이미지
            </td>
            <td scope="col" className="py-1">
              유저이메일
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
              재고
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
          {orderList && orderList.map((order) => <Order order={order} />)}
        </tbody>
      </table>
    </>
  );
}
