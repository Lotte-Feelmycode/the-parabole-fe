import { ORDER_PAY } from '@utils/constants/types';
import Pay from '@components/order/Pay';
import { useEffect, useState } from 'react';
import OrderList from './SellerOrderList';

export default function PayList() {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(-1);

  useEffect(() => {}, [index]);

  function clicked(idx) {
    setCount(count + 1);
    setIndex(idx);
  }

  function selectPay(name, idx) {
    if (idx === index) {
      return (
        <Pay
          buttonText={name}
          onClickFunc={() => clicked(idx)}
          css={{ border: '1px solid black' }}
        />
      );
    } else {
      return (
        <div>
          <Pay buttonText={name} onClickFunc={() => clicked(idx)} />
        </div>
      );
    }
  }

  return (
    <>
      {ORDER_PAY.map((order) => (
        <a onClick={() => {}}>
          <div>{selectPay(order.name, order.index)}</div>
        </a>
      ))}
    </>
  );
}
